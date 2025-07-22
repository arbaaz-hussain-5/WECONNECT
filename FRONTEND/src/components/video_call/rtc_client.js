
export async function makeCall(video_po, socket, receiver) {
    const openMediaDevices = async (constraints) => {
        return await navigator.mediaDevices.getUserMedia(constraints);
    }
    const localStream = await openMediaDevices({
        'video': true,
        'audio': true
    });
    console.log("got local media stream track");
    console.log(localStream)
    const track = localStream.getTracks()
    const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
    const peerConnection = new RTCPeerConnection(configuration);
    peerConnection.addEventListener('connectionstatechange', (event) => {
        if (peerConnection.connectionState === 'connected') {
            console.log("connection is estabilished")
            
            peerConnection.addTrack(track[0], localStream);
            console.log("local media stream track is added")
            video_po.current_stream = localStream
            console.log(video_po.current_stream)
            console.log(localStream);
            console.log("added local media track")
            console.log(track[1])

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

    try {
        console.log("local media stream track is adder befor connection");
        console.log(track[1]);
        peerConnection.addTrack(track[1], localStream);

    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("send_message_rtc", { 'offer': offer }, receiver)
    console.log("sending offer object to remote peer")
    console.log(offer)
}

export async function receiveCall( socket, message, ice_list, sender) {


    const configuration = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
    let peerConnection = new RTCPeerConnection(configuration);
    peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
    peerConnection.addEventListener('track', async (event) => {
        console.log("a new track is added to peerConnection Object")
        console.log(event.streams);


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