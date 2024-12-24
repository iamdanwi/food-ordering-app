import type { Category, MenuItem } from '@/types/menu';

const allItems: MenuItem[] = [
    {
        id: 1,
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, basil",
        price: 299,
        image: "/images/menu/margherita.jpg",
        category: "Pizza",
        isVeg: true
    },
    {
        id: 2,
        name: "Chicken Tikka",
        description: "Grilled chicken with Indian spices",
        price: 349,
        image: "/images/menu/chicken-tikka.jpg",
        category: "Main Course",
        isVeg: false
    },
    {
        id: 3,
        name: "Veg Spring Rolls",
        description: "Crispy rolls filled with vegetables",
        price: 199,
        image: "/images/menu/spring-rolls.jpg",
        category: "Starters",
        isVeg: true
    }
];

export const categories: Category[] = [
    {
        id: "pizza",
        name: "Pizza",
        description: "Our handcrafted pizzas made with fresh ingredients",
        items: allItems.filter(item => item.category === "Pizza")
    },
    {
        id: "main-course",
        name: "Main Course",
        description: "Hearty main dishes to satisfy your hunger",
        items: allItems.filter(item => item.category === "Main Course")
    },
    {
        id: "starters",
        name: "Starters",
        description: "Begin your meal with our delicious appetizers",
        items: allItems.filter(item => item.category === "Starters")
    }
]; 