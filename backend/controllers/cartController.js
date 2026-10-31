import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;
        const { id } = req.user;

        const menuItem = await Menu.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found", success: false });
        }

        let cart = await Cart.findOne({user:id});
        if(!cart){
            cart = new Cart({user:id, items: [] });
        }

        const existingItem = cart.items.find((item) => item.menuItem.toString() === menuItemId);
        if(existingItem){
            existingItem.quantity += quantity;
        } else {
            cart.items.push({menuItem: menuItemId, quantity});
        }

        await cart.save();

        return res.status(200).json({ message: "Item added to cart", success: true, cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add item to cart", success: false });
    }
};

// Get item to cart
export const getCart = async (req, res) => {
    try{
        const {id} = req.user;
        const cart = await Cart.findOne({user:id}).populate("items.menuItem");
        if(!cart){
            return res.status(200).json({ items: [] });
        }
        return res.status(200).json({ message: "Cart retrieved", success: true, cart });
    } catch( error ) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get cart", success: false });
    }
}

// Remove item to cart
export const removeFromCart = async (req, res) => {
    try{
        const {id} = req.user;
        const {menuItemId} = req.body;
        const cart = await Cart.findOne({user:id});
        if(!cart){
            return res.status(404).json({message: "Cart not found", success: false});
        }
        cart.items = cart.items.filter(( item ) => item.menuItem.toString() !== menuItemId);
        await cart.save();
        return res.status(200).json({ message: "Item removed from cart", success: true, cart });
    } catch( error ) {
        console.log(error);
        return res.status(500).json({ message: "Failed to remove item from cart", success: false });
    }
}