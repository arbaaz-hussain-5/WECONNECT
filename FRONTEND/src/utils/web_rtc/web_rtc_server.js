
export async function makeCall(VideoStream, socket, receiver) {
    const openMediaDevices = async (constraints) => {
        return await navigator.mediaDevices.getUserMedia(constraints);
    }
    const localStream = await openMediaDevices({
        'video': true,
        'audio': true
    });
    console.log("got local mediastream object");
    console.log(localStream)
    const track = localStream.getTracks()
    console.log("got local mediastream tracks array");
    console.log(track)
    const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
    const peerConnection = new RTCPeerConnection(configuration);
    peerConnection.addEventListener('track', async (event) => {
        console.log("peer added track to peerConnection Object")
        console.log(event.streams);
        VideoStream.video_elm_remote.current.srcObject = event.streams[0]
    });
    peerConnection.addEventListener("negotiationneeded", (event) => {
        console.log("re collecting icecandidate of local peer and dispatching to remote peer")

    })
    peerConnection.addEventListener('connectionstatechange', (event) => {
        if (peerConnection.connectionState === 'connected') {
            console.log("connection is estabilished")
        }
    });
    peerConnection.addEventListener('icecandidate', async (event) => {
        if (event.candidate) {
            console.log("collecting icecandidate of local peer and dispatching to remote peer")
            socket.emit("send_message_rtc", { 'icecandidate': event.candidate }, receiver);
        }
    });
    socket.on('receive_message_rtc', async (message, sender) => {
        if (message.icecandidate) {
            try {
                await peerConnection.addIceCandidate(message.icecandidate);
                console.log("receieving iceCandidates from remote peer")
                console.log(message.icecandidate)
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }
        }
    });
    socket.on("receive_message_rtc", async (message, sender) => {
        if (message.answer) {
            const remoteDesc = new RTCSessionDescription(message.answer);
            await peerConnection.setRemoteDescription(remoteDesc);
            console.log("received answer object from remote peer")
            console.log(remoteDesc)
        }
    });

    let vs = null;

    try {
        console.log("local media stream track is adder befor connection");
        console.log(track[0]);
        console.log(track[1]);
        peerConnection.addTrack(track[0], localStream)
        vs = peerConnection.addTrack(track[1], localStream)

    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
    VideoStream.current_stream = localStream
    VideoStream.video_elm_local.current.srcObject = localStream
    console.log("inWebRtc")
    console.log(VideoStream)

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit("send_message_rtc", { 'offer': offer }, receiver)
    console.log("sending offer object to remote peer")
    console.log(offer)



    VideoStream.remove_video = async () => {
        peerConnection.removeTrack(vs)
        console.log(peerConnection.getSenders())
        alert("removed")

    }

    VideoStream.add_video = () => {
        peerConnection.addTrack(track[1], localStream)
        console.log(peerConnection.getSenders())
          alert("addes")

    }





}

export async function receiveCall(VideoStream, socket, message, ice_list, sender) {


    const openMediaDevices = async (constraints) => {
        return await navigator.mediaDevices.getUserMedia(constraints);
    }
    const localStream = await openMediaDevices({
        'video': true,
        'audio': true
    });
    console.log("got local mediastream object");
    console.log(localStream)
    VideoStream.current_stream = localStream
    const track = localStream.getTracks()
    console.log("got local mediastream tracks array");
    console.log(track)
    VideoStream.video_elm_local.current.srcObject = localStream

    const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
    let peerConnection = new RTCPeerConnection(configuration);
    peerConnection.addTrack(track[0], localStream)
    peerConnection.addTrack(track[1], localStream)
    console.log("local media stream track is added befor connection");
    peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));

    peerConnection.addEventListener('track', async (event) => {
        console.log("peer added tracks to peerConnection Object")
        console.log(event.streams);
        const track = event.streams[0].getTracks()
        console.log("added mediastream tracks array");
        console.log(track)
        VideoStream.video_elm_remote.current.srcObject = event.streams[0]
    });

    peerConnection.addEventListener('connectionstatechange', async (event) => {
        if (peerConnection.connectionState === 'connected') {
            console.log("connection is estabilished")
        }
    });

    console.log("already received ice candidates of remote peer")
    for (const cd of ice_list) {
        try {
            await peerConnection.addIceCandidate(cd);
            console.log("ice candidate added")
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }
    }
    peerConnection.addEventListener('icecandidate', async (event) => {
        if (event.candidate) {
            console.log("collecting icecandidate of local peer and dispatching to remote peer")
            socket.emit("send_message_rtc", { 'icecandidate': event.candidate }, sender);
        }
    });



    peerConnection.createDataChannel('test')
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("send_message_rtc", { 'answer': answer }, sender)
    console.log("sending answer object to remote peer")


}
function endCall(peerConnection) {
    peerConnection.close()
}