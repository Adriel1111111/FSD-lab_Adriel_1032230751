import myPhoto from '../assets/myphoto.jpeg';

function Header() {
  return (
    <header className="hero">
      <div className="hero-text">
        <h1>Hello!</h1>
        <h2>I am Adriel Fernandes</h2>
        <p>
        Computer Science student at MIT-WPU with experience in Data Science,
        Web Development, and Machine Learning.
        </p>
       
      </div>

      <div className="hero-image">
        <img src={myPhoto} alt="profile" />
      </div>
    </header>
  );
}

export default Header;