import styles from "./Home.module.css";

const Home = (): JSX.Element => {
  return (
    <div className={styles.introContainer}>
      <h1 className={styles.title}>Welcome to LM Prompt Tester</h1>
      <p className={styles.description}>
        "LM Prompt Tester" is a web platform designed for testing various
        language models such as GPT, Claude, Gemini, and more. Users can input
        prompts and observe the generated outputs of these models for analysis
        and experimentation. It allows users to quickly assess how different
        language models respond to different prompts, facilitating better
        understanding and adjustment of the models.
        <br />
        <br />
        Additionally, LM Prompt Tester enables performance comparisons between
        different platforms and language models, providing valuable insights for
        researchers, developers, and NLP engineers. Explore LM Prompt Tester now
        to experiment with your projects and delve into the capabilities of
        language models!
      </p>
    </div>
  );
};

export default Home;
