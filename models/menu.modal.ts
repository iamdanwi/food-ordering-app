// menu - items modal with name, description, price, category, image fileds
import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter menu item name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter menu item description'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please enter menu item price'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please enter menu item category'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Please enter menu item image'],
        trim: true
    }
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;