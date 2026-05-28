import rsIcon from '../../assets/rs-icon.svg';
import ghIcon from '../../assets/gh-icon-white.svg';

function About() {
  return (
    <div className="flex flex-col p-2 text-2xl bg-mist-800 light:bg-mist-100 light:text-black">
      <h1 className="text-4xl my-2">
        <a
          href="https://github.com/rolling-scopes-school/tasks/tree/master/react"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex gap-2"
        >
          <img src={ghIcon} alt="GitHub Logo"></img> RS School. React
        </a>
      </h1>
      <p>Churuya {'(@TamerMain)'}</p>
      <a
        href="https://app.rs.school/profile?githubId=tamermain"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex gap-2"
      >
        <img src={rsIcon} alt="RS School Logo" width="24px" height="24px" /> RS
        School
      </a>
      <a
        href="https://github.com/TamerMain"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex gap-2"
      >
        <img src={ghIcon} alt="GitHub Logo" /> Github
      </a>
    </div>
  );
}

export default About;
