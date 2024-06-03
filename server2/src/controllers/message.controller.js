import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;          //? id is the RECEIVER's ID
        const senderId = req.user._id;        //? sender is the SENDER's ID

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required',
            });
        }

        if(!receiverId) {
            return res.status(400).json({
                success: false,
                message: 'Receiver ID is required',
            });
        }

        let conversations = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversations) {
            conversations = new Conversation({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        });

        if(newMessage) {
            conversations.messages.push(newMessage._id);
        }

        // await newMessage.save();
        // await conversations.save();
        await Promise.all([newMessage.save(), conversations.save()]);
        return res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: {
                message: newMessage,
                conversation: conversations,
            }
        });
    } catch (error) {
        console.log('Error sending message: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if(!receiverId) {
            return res.status(400).json({
                success: false,
                message: 'Receiver ID is required',
            });
        }

        let conversations = await Conversation.find({ $all: [senderId, receiverId] }).populate('messages').exec();

        if (!conversations.length) {
            return res.status(204).json({
                success: true,
                message: 'No messages found',
                data: {
                    conversation: [],
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Messages retrieved successfully',
            data: {
                conversation: conversations,
            }
        });
    } catch (error) {
        console.log('Error getting messages: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
