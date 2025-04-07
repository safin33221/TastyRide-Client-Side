let str = "Okay, I've reviewed the website content for TastyRide. Here's a summary of what I see:\n\n**Overall Impression:**\n\n*   TastyRide appears to be a platform for ordering international cuisine. The site highlights a variety of different food options and"

let formattedStr = str.replace(/\*\*(.*?)\*\*/g, "<h1 className='font-bold'>$1</h1>");

console.log(formattedStr)