import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["Python", "HTML"]
    },
    {
      category: "Technologies & Frameworks",
      skills: ["Flutter (Bloc, GetX)", "Django", "Web Development", "React (Vite)"]
    },
    {
      category: "Database Management",
      skills: ["MySQL"]
    },
    {
      category: "Data Science & Analysis",
      skills: ["Tableau", "R Programming", "Big Data", "AI (Artificial Intelligence)"]
    },
    {
      category: "Software & Tools",
      skills: ["Microsoft Excel", "Microsoft Office", "LaTeX"]
    },
    {
      category: "Editing & Design",
      skills: ["Video Editing", "Photo Editing", "Poster Making", "UI/UX Design"]
    },
    {
      category: "Soft Skills",
      skills: ["Communication Skills", "Teamwork", "Project Management", "Problem-Solving"]
    }
  ];

  const getSkillColor = (category) => {
    const colors = {
      "Programming Languages": "#3b82f6",
      "Technologies & Frameworks": "#8b5cf6",
      "Database Management": "#ec4899",
      "Data Science & Analysis": "#10b981",
      "Software & Tools": "#f59e0b",
      "Editing & Design": "#6366f1",
      "Soft Skills": "#ef4444"
    };
    return colors[category] || "#6366f1";
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        
        <div className="skills-container">
          {skillCategories.map((skillCategory, index) => (
            <div key={index} className="skill-category card">
              <h3 style={{ 
                color: getSkillColor(skillCategory.category),
                marginBottom: '20px',
                fontSize: '1.3rem'
              }}>
                {skillCategory.category}
              </h3>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                {skillCategory.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} style={{
                    backgroundColor: getSkillColor(skillCategory.category),
                    color: 'white',
                    padding: '6px 14px',
                    borderRadius: '30px',
                    fontSize: '0.9rem',
                    display: 'inline-block'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 