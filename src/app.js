import React , { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import wordsToNumbers from 'words-to-numbers';

const alanKey = '9fdc9dbd9a366047d366afa5eb1469552e956eca572e1d8b807a3e2338fdd0dc/stage'
const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1)

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({command, articles, number }) => {
        if(command === 'newHeadlines') {
          // console.log(articles);
          setNewsArticles(articles)
          setActiveArticle(-1)
        }else if(command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        }else if(command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number
          const article = articles[parsedNumber - 1]

          if(parsedNumber > 20) {
            alanBtn().playText('Please try that again')
          } else if(article){
            window.open(article.url, '_blank');
            alanBtn().playText('Opening.....')
          }
        }
      }
    })
  },[])
  return (
    <div>
      <h1> Alan AI</h1>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  )
}

export default App;
