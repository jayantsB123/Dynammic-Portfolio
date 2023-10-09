import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import video from "../assets/img/Space/imp2.mp4";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Jayant Singh`}
                <div className="rotate-text">
                <span className="txt-rotate" dataPeriod="2500" data-rotate='[ "  Web Developer", "Competitve Programmer", "Web Designer", "UI/UX Designer" ]'>
                  <span className="wrap">{text}
                  </span>
                </span>
                </div>
                </h1>
                  <p>I am thrilled to introduce myself as a competitive programmer and full stack web developer. I am deeply passionate about technology, specializing in web development, and I have a keen interest in Artificial Intelligence and Machine Learning.Apart from my tech pursuits, I am also a sports enthusiast proficient in cricket, volleyball, and basketball. I enjoy the strategic challenges of competitive video games and find solace in the pages of novels during my free time.I am eager to explore opportunities where I can apply my skills and enthusiasm. Thank you for your time, and I look forward to the possibility of contributing to your team.</p>
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <video autoPlay muted loop className="video-bg">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Col>
        </Row>
      </Container>
    </section>
    
  )
}
