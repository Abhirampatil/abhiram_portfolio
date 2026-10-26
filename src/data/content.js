// All site content lives here. Edit freely.
export const profile = {
  name: 'Abhiram Patil',
  headline: 'Backend and AI developer',
  intro: 'Computer Science student in Pune. I build backend services, RAG systems and real-time voice AI, and ship them with Docker, Kubernetes and CI/CD.',
  email: 'abhirampatil2005@gmail.com',
  github: 'https://github.com/Abhirampatil',
  linkedin: 'https://www.linkedin.com/in/abhiram-codes/',
  demos: 'https://drive.google.com/drive/folders/1JsLxu-YLe5j23Ee22BG6pX4UsjlgdOO6',
  resume: './resume.pdf',
  location: 'Pune, India',
}

export const about = {
  text: [
    "I'm a Computer Science undergraduate at MIT World Peace University in Pune, focused on backend development and AI-powered systems.",
    'My projects cover a RAG-based project management system, a real-time voice agent, a Jenkins and Kubernetes deployment pipeline, and a Rust/C++ FFI library.',
  ],
  education: { school: 'MIT World Peace University, Pune', degree: 'Bachelor of Computer Science', years: '2023 to present', cgpa: 'CGPA 7.49' },
  achievements: [
    'Participant in national hackathons including Smart India Hackathon (SIH) and HACKMIT',
    'IBM certification: Data Visualization with Excel and Cognos',
    'Rochester Institute of Technology certification: Critical Thinking and Teamwork',
  ],
  focus: ['Backend development', 'RAG and LLM integration', 'Real-time systems', 'Cloud and CI/CD'],
}

export const skills = [
  { group: 'Core', items: ['Python', 'FastAPI', 'REST APIs', 'Node.js', 'Express.js', 'Flask'] },
  { group: 'AI and data', items: ['RAG pipelines', 'LLM integration', 'NLP', 'Vertex AI', 'Google STT/TTS', 'Ollama', 'Scikit-learn'] },
  { group: 'Real-time', items: ['LiveKit Agents', 'WebRTC', 'Audio streaming'] },
  { group: 'Databases', items: ['SQL', 'PostgreSQL', 'pgvector'] },
  { group: 'Cloud and DevOps', items: ['Docker', 'Kubernetes', 'Jenkins', 'AWS EC2', 'Render', 'Vercel'] },
  { group: 'Systems and tools', items: ['Rust', 'C++ FFI', 'Git and GitHub', 'Postman'] },
]

export const projects = [
  {
    title: 'PMS: Project Management with RAG',
    summary: 'A JIRA-style project management system with an AI assistant that answers questions grounded in your own projects, tickets, comments and documents.',
    problem: 'Finding related tickets and project knowledge by keyword is slow. PMS indexes everything as vector embeddings so you can search by meaning and ask questions in plain language.',
    details: [
      'Express backend handles requests and persistence, then delegates AI work to a separate Python microservice',
      'Asynchronous ingestion turns data into Ollama embeddings stored in PostgreSQL with pgvector, so CRUD never waits on AI',
      'Semantic search and RAG chat retrieve relevant project context to produce grounded answers',
      'React frontend, Docker Compose setup',
    ],
    tech: ['React', 'Node.js', 'Express', 'Python', 'Flask', 'PostgreSQL', 'pgvector', 'Ollama', 'Docker'],
    repo: 'https://github.com/Abhirampatil/PMS',
  },
  {
    title: 'Real-Time AI Voice Agent',
    summary: 'A voice assistant that listens, thinks and talks back in a LiveKit room, with live weather and trending-news tools.',
    problem: 'Natural voice conversation needs speech recognition, an LLM and speech synthesis to work together with low delay.',
    details: [
      'Streams audio through Google Cloud STT, Gemini on Vertex AI, then Google Cloud TTS, with end-to-end latency under 3 seconds',
      'JWT-based authentication for WebRTC sessions and secured LiveKit room access',
      'Event-driven backend handling audio streams, transcription events and LLM responses',
    ],
    tech: ['Python', 'FastAPI', 'LiveKit', 'WebRTC', 'Google Cloud STT/TTS', 'Vertex AI Gemini'],
    repo: 'https://github.com/Abhirampatil/AI-Agent',
  },
  {
    title: 'CI/CD on Kubernetes and AWS',
    summary: 'An automated delivery pipeline: pushing code to GitHub triggers Jenkins, which deploys the application to Kubernetes on an AWS EC2 instance.',
    problem: 'Manual builds and deployments are slow and error-prone. A webhook-driven pipeline makes every push to main a repeatable deployment.',
    details: [
      'GitHub webhook triggers the Jenkins pipeline (Jenkins served on port 8080)',
      'Application runs on Kubernetes, exposed through a NodePort service',
      'Repository documents the restart checklist for changing EC2 IPs and re-pointing the webhook',
    ],
    tech: ['Jenkins', 'Kubernetes', 'AWS EC2', 'GitHub Webhooks'],
    repo: 'https://github.com/Abhirampatil/ci-cd-kubernetes-project',
  },
  {
    title: 'proxie-ffi: Rust over C++',
    summary: 'A safe Rust wrapper around a small C++ string-utilities library, built for a backend evaluation round.',
    problem: 'Calling C++ from Rust means raw pointers and manual memory management. This crate hides all of that behind a safe API that returns Result instead of panicking.',
    details: [
      'build.rs compiles the C++ source and generates bindings with bindgen',
      'C-allocated strings are copied into Rust and freed immediately, so no C memory outlives a call',
      'Invalid UTF-8 returns a clean error instead of corrupt output; 17 integration tests include allocation stress cycles',
    ],
    tech: ['Rust', 'C++', 'bindgen', 'FFI'],
    repo: 'https://github.com/Abhirampatil/FFI',
  },
]

export const sections = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
