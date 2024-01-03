function initializeSocket() {
    const io = require("socket.io")(8900, {
        cors:{
            origin:'http://localhost:3000'
        }
    });
    
    let users = []
    const addUser = (userId, socketId) => { 
        if(!users.some((user)=>user.userId === userId)) {
            users.push({
                userId, 
                socketId,
            })
        } 
        else {
            const user = users.find((user)=>user.userId === userId); 
            user.socketId = socketId; 
        }
    }
    
    const removeUser = (socketId) => { 
        users = users.filter((user) => user.socketId!==socketId)
    }
    
    io.on("connection", (socket) => {
        console.log("a user connected!")
        // take userId, socketId from user client 
        socket.on('addUser', userId => {
            addUser(userId, socket.id)
            io.emit("getUsers", users)
        })
    
        socket.on('disconnect', () => { 
            console.log('a user disconnected!')
            removeUser(socket.id)
            io.emit("getUsers", users)
        })
    
        socket.on('sendMessage', (currentChat) => { 
            if(currentChat)
                io.to(currentChat?._id).emit("receiveMessage", currentChat); 
        })
    
        socket.on('joinRoom', (currentChat) => { 
            if(currentChat?._id)
                socket.join(currentChat?._id);
        })
    })
}

module.exports = initializeSocket;