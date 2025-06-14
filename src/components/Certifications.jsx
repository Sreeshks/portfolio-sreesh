// import React from 'react';

// const Certifications = () => {
//   const certifications = [
//     "Python Full Stack Development",
//     "GIT",
//     "Machine Learning with Python",
//     "Data Analysis with Python",
//     "Microsoft Cloud Skills Challenge",
//     "Digital Marketing",
//     "Python 101 for Data Science",
//     "Data Science 101",
//     "Introduction to Flutter"
//   ];

//   return (
//     <section id="certifications" className="certifications">
//       <div className="container">
//         <h2 className="section-title">Certifications</h2>
        
//         <div className="grid grid-3" style={{
//           '@media (max-width: 768px)': {
//             gridTemplateColumns: '1fr'
//           }
//         }}>
//           {certifications.map((cert, index) => (
//             <div key={index} className="card" style={{ textAlign: 'center' }}>
//               <div style={{ 
//                 fontSize: '2rem', 
//                 color: 'var(--primary-color)',
//                 marginBottom: '15px'
//               }}>
//                 🏆
//               </div>
//               <h3 style={{ fontSize: '1.1rem' }}>{cert}</h3>
//             </div>
//           ))}
//         </div>
        
//         <div style={{ 
//           textAlign: 'center',
//           marginTop: '30px'
//         }}>
//           <a 
//             href="https://www.linkedin.com/in/sreeshksuresh/" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="btn"
//           >
//             View All Certifications
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Certifications; 