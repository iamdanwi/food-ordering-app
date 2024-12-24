export function LeafIcon({ className = "h-6 w-6" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M15.5 3.5C15.5 2.67157 14.8284 2 14 2H10C9.17157 2 8.5 2.67157 8.5 3.5V5H15.5V3.5Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M6.5 5C5.67157 5 5 5.67157 5 6.5V18.5C5 19.3284 5.67157 20 6.5 20H17.5C18.3284 20 19 19.3284 19 18.5V6.5C19 5.67157 18.3284 5 17.5 5H6.5ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
        </svg>
    );
} 