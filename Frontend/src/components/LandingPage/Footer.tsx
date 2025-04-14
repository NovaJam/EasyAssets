import { Link } from "react-router-dom"
import { FaGithub, FaDiscord, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
    {/* CTA Section */}
 <section className="text-center px-6 py-16 ">
    <hr className="mb-20 opacity-40"/>
 <h2 className="text-3xl md:text-4xl font-bold mb-4">
   Ready to move with <span className="text-blue-500">EasyAssets?</span>
 </h2>
 <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
   Increase efficiency, productivity and asset tracking with EasyAssets—trusted by modern teams for asset management.
 </p>
 
 <Link to="/signup">
  <button className="text-lg px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
    Get Started
  </button>
</Link>

</section>
<hr className=" opacity-40"/>


{/* Footer */}
<footer className="px-6 py-10 bg-white text-black">
 <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
   <div>
     <h3 className="text-xl font-bold">EasyAssets</h3>
     <p className="text-sm mt-2">Smart asset tracking, simplified.</p>
     <p className="text-xs mt-2">Part of Nova Jam by Nova Designs Community</p>
     <div className="flex space-x-4 mt-4">
       <a 
         href="https://github.com/NovaJam/EasyAssets" 
         target="_blank" 
         rel="noopener noreferrer"
         className="text-gray-600 hover:text-black transition-colors"
       >
         <FaGithub size={24} />
       </a>
       <a 
         href="https://discord.gg/hUYFy3UKmD" 
         target="_blank" 
         rel="noopener noreferrer"
         className="text-gray-600 hover:text-[#7289da] transition-colors"
       >
         <FaDiscord size={24} />
       </a>
       <a 
         href="https://www.youtube.com/@Nova_Designs_" 
         target="_blank" 
         rel="noopener noreferrer"
         className="text-gray-600 hover:text-red-600 transition-colors"
       >
         <FaYoutube size={24} />
       </a>
     </div>
     <p className="text-xs mt-6">© 2025 EasyAssets. All Rights Reserved.</p>
   </div>
   <div>
     <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
     <ul className="text-sm space-y-2">
       <li>
         <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
           Dashboard
         </Link>
       </li>
       <li>
         <Link to="/login" className="hover:text-blue-600 transition-colors">
           Login
         </Link>
       </li>
       <li>
         <Link to="/signup" className="hover:text-blue-600 transition-colors">
           Sign Up
         </Link>
       </li>
     </ul>
   </div>
   <div>
     <h4 className="text-sm font-semibold mb-3">Need Help?</h4>
     <ul className="text-sm space-y-2">
       <li>
         <a href="https://discord.gg/hUYFy3UKmD" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
           Contact Us
         </a>
       </li>
       <li>
         <a href="https://github.com/NovaJam/EasyAssets/wiki/Easyassets-Wiki" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
           Documentation
         </a>
       </li>
     </ul>
   </div>
   <div>
     <h4 className="text-sm font-semibold mb-3">Community</h4>
     <ul className="text-sm space-y-2">
       <li>
         <a href="https://github.com/NovaJam/EasyAssets" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
           GitHub
         </a>
       </li>
       <li>
         <a href="https://discord.gg/hUYFy3UKmD" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
           Discord
         </a>
       </li>
       <li>
         <a href="https://www.youtube.com/@Nova_Designs_" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
           Nova Designs YouTube
         </a>
       </li>
     </ul>
   </div>
 </div>
</footer>
</div>
  )
}

export default Footer
