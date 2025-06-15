// import React, { useState } from 'react';

// const Projects = () => {
//   const projects = [
//     {
//       title: "Relief Medicals Delivery App",
//       technologies: "Flutter with Bloc State Management",
//       description: "A delivery app for Relief Medicals staff to streamline transactions and track customer locations with real-time status updates (delivered, partially delivered, returned, or pending). Built with Flutter for the frontend and .NET for the backend, ensuring a seamless user experience.",
//       image: "/profile.png",  // Replace with actual project image
//       category: "Professional"
//     },
//     { 
//       title: "InsightPro App",
//       technologies: "Flutter with Bloc State Management",
//       description: "Developed a business-oriented app using Flutter and Bloc state management to provide live reports and real-time sales amounts. Implemented features for tracking business metrics, including live sales data and performance analytics, to support informed decision-making.",
//       image: "/profile.png",  // Replace with actual project image
//       category: "Professional"
//     },
//     {
//       title: "Movemark - Attendance Marking System",
//       technologies: "AI-Powered GAIT-Based Solution",
//       description: "Developed Movemark, an attendance marking system using the GAIT system to recognize body movements for automated tracking. Integrated advanced AI techniques for accurate identification and seamless user experience. Won 2nd Prize at a hackathon.",
//       image: "/profile.png",  // Replace with actual project image
//       category: "Hackathon"
//     },
//     {
//       title: "Exaima - Online Proctoring System",
//       technologies: "React (Vite)",
//       description: "Developed Exaima, a web-based proctoring system using React (Vite) to facilitate secure and monitored online examinations. Implemented features for real-time monitoring and user authentication to ensure exam integrity.",
//       image: "/src/assets/profile.png",  // Replace with actual project image
//       category: "Hackathon",
//       demo: "https://ex-a-ima-frontend-git-main-adhivps-projects.vercel.app/"
//     }
//   ];

//   const [filter, setFilter] = useState('All');

//   const filteredProjects = filter === 'All' 
//     ? projects 
//     : projects.filter(project => project.category === filter);

//   return (
//     <section id="projects" className="projects" style={{ backgroundColor: '#f1f5f9' }}>
//       <div className="container">
//         <h2 className="section-title">My Projects</h2>
        
//         <div className="filter-buttons" style={{ 
//           display: 'flex', 
//           justifyContent: 'center',
//           gap: '15px',
//           marginBottom: '40px'
//         }}>
//           {['All', 'Professional', 'Hackathon'].map(category => (
//             <button 
//               key={category} 
//               onClick={() => setFilter(category)}
//               className={`btn-premium ${filter === category ? 'active' : ''}`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
        
//         <div className="grid grid-2">
//           {filteredProjects.map((project, index) => (
//             <div key={index} className="card" style={{ overflow: 'hidden' }}>
//               <div className="project-img" style={{ marginBottom: '20px', overflow: 'hidden', borderRadius: '5px' }}>
//                 <img 
//                   src={project.image} 
//                   alt={project.title} 
//                   style={{ 
//                     width: '100%',
//                     height: '200px',
//                     objectFit: 'cover',
//                     transition: 'transform 0.5s ease',
//                     '&:hover': {
//                       transform: 'scale(1.05)'
//                     }
//                   }}
//                 />
//               </div>
//               <span style={{ 
//                 backgroundColor: project.category === 'Professional' ? '#10b981' : '#3b82f6',
//                 color: 'white',
//                 padding: '5px 10px',
//                 borderRadius: '5px',
//                 fontSize: '0.8rem',
//                 marginBottom: '15px',
//                 display: 'inline-block'
//               }}>
//                 {project.category}
//               </span>
//               <h3 className="card-title">{project.title}</h3>
//               <p style={{ 
//                 fontSize: '0.9rem', 
//                 color: 'var(--primary-color)',
//                 marginBottom: '10px',
//                 fontWeight: 500
//               }}>
//                 {project.technologies}
//               </p>
//               <p style={{ marginBottom: '20px' }}>{project.description}</p>
//               {project.demo && (
//                 <a 
//                   href={project.demo} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   style={{
//                     display: 'inline-block',
//                     color: 'var(--primary-color)',
//                     fontWeight: 500,
//                     textDecoration: 'underline'
//                   }}
//                 >
//                   View Live Demo →
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;