import gamestackTexture2Large from 'assets/a2.png';
import gamestackTexture2Placeholder from 'assets/a2.png';
import gamestackTexture2 from 'assets/a2.png';
import gamestackTextureLarge from 'assets/a2.png';
import gamestackTexturePlaceholder from 'assets/a2.png';
import gamestackTexture from 'assets/a2.png';
import sliceTextureLarge from 'assets/a3.png';
import sliceTexturePlaceholder from 'assets/a3.png';
import sliceTexture from 'assets/a3.png';
import sprTextureLarge from 'assets/a1.png';
import sprTexturePlaceholder from 'assets/a1.png';
import sprTexture from 'assets/a1.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Frontend', 'Backened'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Senior Fullstack Developer"
        description="Portfolio of Wasif Ali — a product developer working on web & mobile
          apps with a focus on motion, experience design, and accessibility."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Reimagine Decentralized with Nitro League "
        description="Nitro League officially entered the public realm with their token launch $NITRO, in December 2021. But long before that, there was a plan and a vision. We wanted to build metaverse-ready NFTs that could solve the main problems within NFT markets today: lack of liquidity, lack of utility, and centralization."
        buttonText="View project"
        buttonLink="https://nitroleague.com/racing"
        model={{
          type: 'laptop',
          alt: 'Nitro League',
          textures: [
            {
              srcSet: [sprTexture, sprTextureLarge],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Botics Incorparating Ai with robotics"
        description="Our SaaS platform makes adopting robotics & automation faster and easier"
        buttonText="View website"
        buttonLink="https://botics.dev/"
        model={{
          type: 'laptop',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Holedo TMR."
        description="Holedo makes the hospitality sector an attractive career choice and enables employers to develop and recruit skilled professionals."
        buttonText="View project"
        buttonLink="https://www.holedo.com/recruitment/"
        model={{
          type: 'laptop',
          alt: 'Holedo TMR',
          textures: [
            {
              srcSet: [sliceTexture, sliceTextureLarge],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
