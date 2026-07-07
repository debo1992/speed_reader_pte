const articleInput = document.getElementById("articleInput");
const wpmInput = document.getElementById("wpmInput");
const startRange = document.getElementById("startRange");
const rampEndInput = document.getElementById("rampEndInput");
const endRange = document.getElementById("endRange");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const wordDisplay = document.getElementById("wordDisplay");
const progressText = document.getElementById("progressText");
const effectiveWpmText = document.getElementById("effectiveWpmText");
const statusText = document.getElementById("statusText");
const essayTopicButtons = document.getElementById("essayTopicButtons");

let words = [];
let index = 0;
let timeoutId = null;
let isPaused = false;
let startWpm = 300;
let targetWpm = 300;

const essayTopics = [
  {
    title: "1. University Education",
    content: "In today's fast-paced world, the importance of higher education cannot be overstated. As an increasing number of people believe that every young person should go to university, it has become a topic of considerable debate. While some people strongly support this viewpoint, I firmly disagree because success depends on individual abilities, interests, and career aspirations rather than a university degree alone. There are several arguments supporting my viewpoint. The most significant one is that not every profession requires a university education. Not only can vocational training, apprenticeships, and professional certifications provide practical knowledge, but they also prepare individuals for successful careers. As a result, many young people can achieve financial independence and professional growth without attending university. Therefore, it is evident that every young person should be free to choose the educational pathway that best matches their skills and ambitions. Another important aspect worth considering is that society benefits from a diverse workforce. By encouraging different career paths, countries can develop skilled technicians, entrepreneurs, artists, healthcare workers, and other professionals who contribute significantly to economic growth and social development. Although university education offers numerous advantages, requiring every young person to attend university may create unnecessary financial pressure, reduce career flexibility, and lead to shortages in skilled trades. Hence, it is clear that alternative forms of education deserve equal recognition and support. To conclude the above arguments, one can say that, despite the undeniable benefits of higher education, it should not be regarded as the only path to success. Consequently, I firmly believe that every young person should have the freedom to choose the educational or career path that best suits their abilities, interests, and long-term goals."
  },
  {
    title: "2. Written Complaints",
    content: "The increasing influence of different methods of complaints has ignited numerous discussions. This matter is particularly significant due to its impact on customer satisfaction and business communication. While some argue that complaining in person is more effective, I firmly agree that complaining in written is more effective. In this essay, I will discuss the reasons for my viewpoint and their implications for society. One of the primary reasons for my position is that complaints in written complaints provide clear evidence and a permanent record. This is further supported by the fact that customers can explain their concerns in a detailed and organised manner. Research has demonstrated that written communication improves transparency, accountability, and problem resolution. Moreover, an additional reason to support my view is that businesses have sufficient time to investigate the issue and provide an appropriate solution. Thus, the advantages of written complaints are essential to be considered for improving customer service and consumer protection. However, alongside the benefits, there are some drawbacks to consider. One significant limitation is that written complaints may delay immediate action. Numerous studies indicate that face-to-face communication often leads to faster clarification and instant feedback. Furthermore, personal interaction fosters stronger communication, which impacts both individuals and society. Consequently, it is evident that these drawbacks must be addressed, but they do not outweigh the overall advantages of written complaints. To conclude, I strongly believe that complaining in written is the most effective method of resolving issues related to products or services. Future efforts should focus on finding a balanced approach, aiming to maximise the positive impact of written complaints, while minimising any potential adverse effects."
  },
  {
    title: "3. Emotional Well-being",
    content: "The intricate connection between emotional well-being and personal material prosperity remains a central point of contention in contemporary socio-economic discourse. While many contend that a positive state of mind serves as a vital engine for workplace productivity and career advancement, others argue that financial affluence is the primary prerequisite for life satisfaction rather than its byproduct. In my view, prioritising psychological happiness yields far more profound economic advantages than drawbacks. To begin with, a flourishing mental state directly enhances the cognitive flexibility, innovative thinking, and emotional resilience required to navigate modern corporate environments. Individuals who experience genuine job satisfaction are naturally more motivated, which frequently translates into superior performance and accelerated promotions. For example, empirical studies in organisational psychology indicate that emotionally fulfilled employees consistently outperform their peers in sales revenue and strategic problem-solving. Furthermore, an optimistic disposition facilitates the cultivation of strong professional networks, which are indispensable for discovering and securing lucrative economic opportunities. Conversely, critics rightfully point out that pursuing emotional fulfilment without pragmatic financial boundaries can precipitate severe economic instability. An overemphasis on immediate gratification or subjective happiness can sometimes breed professional complacency. This mindset can lead individuals to neglect crucial long-term financial planning, savings, and investments. For instance, data regarding consumer behaviour suggests that a notable proportion of individuals who prioritise short-term emotional satisfaction over fiscal responsibility eventually face substantial debt. Therefore, emotional well-being must be balanced with strict financial literacy to ensure sustainable prosperity. In conclusion, while an undisciplined pursuit of happiness can undoubtedly lead to financial vulnerability, the intrinsic economic benefits of a positive mindset remain paramount. Emotional well-being provides the intellectual and social capital necessary to generate wealth in a knowledge-driven economy. Ultimately, sustainable success is best achieved by nurturing mental health while maintaining a robust commitment to financial discipline."
  },
  {
    title: "4. Good Listener",
    content: "In this modern world, the importance of a good listener cannot be ignored. More and more people are starting to believe that a good listener is better than a good talker in social situations. I agree with this statement because there is ample evidence to support my point of view. A good listener refers to a person who knows how to be calm and patient. They have a quality of understanding of the feelings of other people. They know about how to deal with the situation, and how to solve a problem. Every good listener can make a good relationship within society. People want a good listener rather than a talker because they want to share their feelings and emotions. For this reason, they prefer a good listener. For example, if there is something happening in society, people search for a social leader who can listen to their problems. Moreover, there are various advantages to being a good listener rather than a good talker in social situations. A good listener can get more prestige in society because people think this kind of person is more intelligent, sincere, and educated. But, there is also a need for good talkers because they can find the solution in different ways, and they are able to speak for the public right in society. In conclusion, despite some disadvantages of being a good listener, the advantages are far better and greater than being a good talker in social situations."
  },
  {
    title: "5. Geography and Character",
    content: "Whether the geography of a country has a powerful influence on the character of its people has become an integral part of the rising debate in the present world. Some people believe that environmental factors and landscapes directly shape cultural traits and mindsets. On the other hand, some argue that modern globalization and technology have minimized the impact of physical terrain on human character. In my opinion, geographic influence on national identity has more positive impacts than negatives around the globe. This essay will explain why in the following paragraphs, and thus, it will lead to a plausible conclusion. To commence with, there are several arguments in favor of my belief. The most prominent one is that harsh or unique climates naturally foster resilience, cooperation, and specific lifestyle habits. According to research conducted by Western Sydney University, communities living in mountainous or isolated terrains exhibit a 35 percent higher rate of community interdependence and survival skills. Secondly, abundant natural resources like coastlines or fertile land often cultivate an open, trade-oriented, and welcoming cultural disposition. On the other hand, proponents may point out that one of the most significant disadvantages of a given topic is that overemphasizing regional geography can reinforce cultural stereotypes or lead to deterministic biases. For instance, a survey conducted in the United States reveals that many individuals feel their personal values are shaped far more by digital connectivity and urban upbringing than by their country's physical landscape. To conclude, when there are a lot of demerits associated with attributing human behavior entirely to geographical factors, the advantages outweigh the disadvantages. Hence, one should not overlook either side."
  },
  {
    title: "6. Wealthy Nations and Poorer Countries",
    content: "The question of whether wealthy nations should be required to share their wealth with poorer countries is a significant debate involving ethics, economics, and global responsibility. While there is a strong moral case for assistance, I believe that sustainable partnership is more effective than mandatory wealth redistribution. Arguments for supporting poorer nations are grounded in both justice and practicality. Historically, many developed nations attained their prosperity through systems that often disadvantaged the Global South. From this perspective, providing financial aid is a form of moral restitution. Furthermore, global stability is interconnected. Extreme poverty in one region frequently leads to instability, migration crises, and conflict, which can affect the entire international community. By investing in the economic development of less fortunate nations, wealthy countries help create a more stable and prosperous global trading environment, which ultimately benefits all nations. However, mandatory wealth redistribution faces practical challenges. Simply transferring funds does not guarantee long-term economic growth and can sometimes create a cycle of dependency. If financial aid is not accompanied by strong institutional oversight, there is a risk that funds may be mismanaged or lost to corruption, failing to reach the citizens who need it most. Instead of direct redistribution, the focus should be on sustainable empowerment. Wealthy nations can better serve the developing world by facilitating technology transfers, supporting educational initiatives, and creating fair trade agreements that allow poorer nations to build their own independent industries. Empowering these nations to achieve self-sufficiency is more dignified and effective than ongoing financial reliance. In conclusion, while wealthy nations have a moral obligation to address global inequality, direct cash redistribution is not the only, nor necessarily the best, solution. A transition toward collaborative partnerships, focused on building sustainable infrastructure and human capital, is the most viable path to reducing global disparity."
  },
  {
    title: "7. Age Restrictions",
    content: "The growing influence of age restrictions on young people has sparked various debates. This issue is particularly significant because of its impact on personal freedom and public safety, affecting both individuals and communities. In this essay, I will discuss the positive and negative aspects of imposing age limits on activities like driving and smoking and their implications for society. One of the key benefits of age restrictions is that they improve public safety significantly. This is also evident by the fact that younger individuals often lack the maturity and experience needed for responsible decision-making. As shown in studies, age limits have had a profound effect on reducing accidents and health issues, benefiting many. Another advantage of these restrictions is that they encourage young people to focus on education and personal development. Thus, the benefits of age limits are vital for both individual and collective success. However, despite their benefits, age restrictions can also lead to significant challenges. For example, the imposition of such limits can lead to feelings of resentment and rebellion among young people. Various studies have shown that strict age limits can cause a lack of trust between generations, creating long-term issues for all stakeholders. Additionally, these restrictions often lead to a delay in gaining essential life skills, which makes it difficult for young people to pursue their normal course. As a result, it is clear that the disadvantages of age restrictions must be managed to reduce their harmful effects. In conclusion, age limits provide both significant advantages and notable challenges. Moving forward, it is important to balance the use of age restrictions to maximize their benefits and minimize their drawbacks."
  },
  {
    title: "8. Advertising",
    content: "In this modern era, the significance of advertising has become a subject of considerable discussion. While some people believe that advertising is harmful because it encourages unnecessary spending, I strongly believe that advertising is beneficial because it provides valuable information and improves consumers' quality of life because it can have numerous positive impacts on both individuals and society. This essay will discuss the reasons supporting my viewpoint in the following paragraphs. The most prominent one is that advertising can play a crucial role in informing consumers about useful products and services and creating meaningful advantages in modern society. This is mainly due to the fact that it allows people to compare different products, prices, and features before making purchasing decisions. For instance, advertisements for energy-efficient home appliances help consumers choose products that reduce electricity consumption and save money in the long term, which clearly demonstrates how advertising can support informed decision-making. As a result, people are able to improve their standard of living while making smarter financial choices. Another essential aspect that should be considered is that advertising can significantly contribute to economic growth and business development. This can be explained by the fact that it enables businesses to promote innovative products and reach a wider audience, which helps companies increase sales and create employment opportunities. A clear example can be seen when small businesses advertise through social media platforms to attract new customers, showing the importance of advertising in supporting business success and encouraging competition. Therefore, both businesses and consumers benefit from a more competitive and innovative marketplace. To conclude, despite having some possible drawbacks, the positive impacts of advertising are considerably greater. Therefore, I firmly believe that advertising is beneficial due to its valuable contributions to consumer awareness, economic development, and overall improvement in people's lives."
  },
  {
    title: "9. E-readers vs Printed Books",
    content: "In the contemporary world, there is an ongoing debate regarding whether electronic readers will eventually replace traditional printed books. While some technology analysts argue that digital devices offer greater convenience and accessibility, others suggest that printed books will continue to hold an important place in education and personal reading. From my perspective, I partially agree that e-readers will become increasingly popular, but I do not believe they will completely replace printed books. The following paragraphs will elucidate this stance in detail. To begin with, e-readers provide numerous advantages that make them an attractive alternative to printed books. A single electronic device can store thousands of books, allowing users to carry an entire library wherever they go. Research indicates that digital books are often more affordable and environmentally friendly because they reduce paper consumption and printing costs. For example, university students frequently use e-readers to access textbooks instantly, highlight important sections, and search for information efficiently. Consequently, electronic readers have transformed the way people access and manage educational resources. On the other hand, supporters of printed books argue that physical books offer a reading experience that digital devices cannot fully replicate. While e-readers are convenient, many readers prefer printed books because they reduce eye strain, improve concentration, and create a stronger emotional connection with the reading process. Studies have shown that many students retain information more effectively when reading printed materials. From my own experience, I find it easier to focus and remember important concepts when studying from printed books, especially during examination preparation. In conclusion, although e-readers have revolutionized reading through convenience and accessibility, I disagree that they will completely replace traditional printed books. Both formats possess unique advantages, and they are likely to coexist by serving the different needs and preferences of readers in the future."
  },
  {
    title: "10. Throw-Away Society",
    content: "Nowadays, modern society has become increasingly dependent on disposable products, resulting in a significant increase in waste. This throw-away culture is damaging the environment. This essay will discuss the main causes of this problem and suggest several effective solutions. One major cause is consumerism. Many people prefer buying new products instead of repairing old ones because new items are often inexpensive and easily available. In addition, companies frequently introduce new models of electronic devices, clothes, and household products, encouraging consumers to replace perfectly usable items. Another important reason is the widespread use of single-use plastics and excessive packaging. Disposable cups, bottles, bags, and food containers are used for convenience but are thrown away after only one use, creating huge amounts of rubbish. Several measures can help solve this problem. First, governments should introduce stricter regulations to reduce waste. For example, they can ban single-use plastics, encourage recycling, and impose fines on businesses that use unnecessary packaging. Investing in efficient waste management and recycling facilities would also reduce the amount of rubbish sent to landfills. Second, individuals should adopt more responsible consumption habits. People can repair old products, reuse items whenever possible, recycle household waste, and choose durable, environmentally friendly products instead of disposable ones. Public awareness campaigns and environmental education in schools can also encourage sustainable behaviour. In conclusion, the throw-away society is mainly caused by excessive consumerism and the widespread use of disposable products. However, this problem can be addressed through stricter government policies and greater public responsibility. If both governments and individuals work together, the amount of waste can be significantly reduced, leading to a cleaner and healthier environment."
  },
  {
    title: "11. New Inventions and Technology",
    content: "We are living in a time when new inventions and technologies are introduced almost every day. From artificial intelligence to advanced medical treatments, innovation has transformed the way people live and work. Although this trend has some drawbacks, I believe its advantages are far greater. One major advantage is that new inventions improve people's quality of life. Modern technology has made communication faster, transportation more efficient, and healthcare more effective. For example, smartphones allow people to stay connected regardless of distance, while medical innovations help doctors diagnose and treat diseases more accurately. In addition, automation and digital tools increase productivity, enabling businesses to complete tasks more quickly and efficiently. As a result, people save time and enjoy greater convenience in their daily lives. However, constant innovation also creates several challenges. One significant disadvantage is that technology can replace human workers, leading to unemployment in certain industries. Machines and artificial intelligence are increasingly performing tasks once done by people. Furthermore, the rapid pace of technological change encourages people to replace products frequently, contributing to electronic waste and environmental pollution. Another concern is that many individuals become overly dependent on technology, reducing face-to-face interaction and physical activity. Despite these disadvantages, I believe the benefits outweigh the drawbacks. Technological progress has contributed to longer life expectancy, better education, and greater access to information. While society must address issues such as job displacement and environmental damage, these problems can be reduced through responsible policies, education, and sustainable innovation. In conclusion, living in an era of continuous invention offers both opportunities and challenges. Although rapid technological development may create social and environmental problems, its positive impact on human life, economic growth, and global connectivity makes it an overall beneficial trend."
  }
];

function normalizeText(text) {
  return text
    .replace(/\s+/g, " ")
    .trim();
}

function loadWords() {
  const raw = normalizeText(articleInput.value);
  if (!raw) {
    words = [];
    return;
  }
  words = raw.split(/\s+/);
}

function renderEssayTopicButtons() {
  essayTopicButtons.innerHTML = "";
  essayTopics.forEach((topic) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "topic-button";
    button.textContent = topic.title;
    button.addEventListener("click", () => {
      loadEssayTopic(topic);
    });
    essayTopicButtons.appendChild(button);
  });
}

function loadEssayTopic(topic) {
  articleInput.value = topic.content;
  loadWords();
  index = 0;
  isPaused = false;
  if (timeoutId) {
    stopReading();
  }
  updateDisplay();
  startReading();
}

function updateProgress() {
  const total = words.length;
  progressText.textContent = `${Math.min(index + 1, total)} / ${total}`;
}

function setStatus(message) {
  statusText.textContent = message;
}

function findOptimalLetterIndex(word) {
  if (!word) return 0;
  const len = word.length;
  if (len <= 3) {
    return 0;
  }
  return Math.max(0, Math.floor((len - 1) / 2));
}

function buildHighlightedWord(word) {
  const index = findOptimalLetterIndex(word);
  const before = word.slice(0, index);
  const highlight = word.slice(index, index + 1);
  const after = word.slice(index + 1);
  return `${before}<span class="highlight">${highlight}</span>${after}`;
}

function updateDisplay() {
  if (words.length === 0) {
    wordDisplay.textContent = "Paste an article and press Start.";
    progressText.textContent = "0 / 0";
    effectiveWpmText.textContent = "0 WPM";
    return;
  }

  const currentWord = words[index] || "";
  wordDisplay.innerHTML = buildHighlightedWord(currentWord);
  updateProgress();
  updateEffectiveWpm();
}

function setControlsPlaying(playing) {
  startButton.disabled = playing;
  pauseButton.disabled = !playing;
  resetButton.disabled = !playing && index === 0;
}

function getCurrentWpm() {
  const baseWpm = Number(startWpm) || 300;
  const endWpm = Math.max(baseWpm, Number(rampEndInput.value) || baseWpm);
  const progress = Math.min(1, index / Math.max(1, words.length - 1));
  return Math.round(baseWpm + (endWpm - baseWpm) * progress);
}

function getDelay() {
  return 60000 / getCurrentWpm();
}

function updateEffectiveWpm() {
  effectiveWpmText.textContent = `${getCurrentWpm()} WPM`;
}

function scheduleNextWord() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
  }
  timeoutId = window.setTimeout(() => {
    tick();
  }, getDelay());
}

function tick() {
  if (index >= words.length - 1) {
    stopReading();
    return;
  }

  index += 1;
  updateDisplay();
  scheduleNextWord();
}

function startReading() {
  loadWords();
  if (words.length === 0) {
    setStatus("Add text before starting.");
    return;
  }

  if (timeoutId) {
    return;
  }

  startWpm = Number(wpmInput.value) || 300;
  targetWpm = Math.max(startWpm, Number(rampEndInput.value) || startWpm);

  if (isPaused) {
    isPaused = false;
    setStatus("Resumed");
  } else {
    index = 0;
    setStatus("Reading...");
  }

  updateDisplay();
  scheduleNextWord();
  setControlsPlaying(true);
}

function pauseReading() {
  if (!timeoutId) {
    return;
  }
  window.clearTimeout(timeoutId);
  timeoutId = null;
  isPaused = true;
  setStatus("Paused");
  setControlsPlaying(false);
}

function stopReading() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
  setStatus("Complete");
  setControlsPlaying(false);
}

function resetReading() {
  if (timeoutId) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
  index = 0;
  isPaused = false;
  setStatus("Ready");
  updateDisplay();
  setControlsPlaying(false);
}

wpmInput.addEventListener("input", () => {
  startRange.value = wpmInput.value;
  const newStart = Number(wpmInput.value) || 300;
  if (Number(rampEndInput.value) < newStart) {
    rampEndInput.value = newStart;
    endRange.value = newStart;
  }
  rampEndInput.min = newStart;
});

startRange.addEventListener("input", () => {
  wpmInput.value = startRange.value;
  const newStart = Number(startRange.value) || 300;
  if (Number(rampEndInput.value) < newStart) {
    rampEndInput.value = newStart;
    endRange.value = newStart;
  }
  rampEndInput.min = newStart;
});

rampEndInput.addEventListener("input", () => {
  endRange.value = rampEndInput.value;
});

endRange.addEventListener("input", () => {
  rampEndInput.value = endRange.value;
});

startButton.addEventListener("click", () => {
  startReading();
});

pauseButton.addEventListener("click", () => {
  pauseReading();
});

resetButton.addEventListener("click", () => {
  resetReading();
});

articleInput.addEventListener("input", () => {
  if (!timeoutId) {
    updateDisplay();
  }
});

window.addEventListener("load", () => {
  renderEssayTopicButtons();
  updateDisplay();
});
