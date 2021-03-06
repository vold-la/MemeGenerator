import './App.css';
import { useEffect, useState } from 'react';
import {
  AppStyle,
  Button,
  ButtonWrapper,
  Form,
  HeaderOne,
  HistoryImage,
  HistoryImageWrapper,
  HistoryItem,
  Image,
  ImageWrapper,
  Input,
  InputWrapper,
  Label,
  Main,
  PreviewImage,
  PreviewWrapper,
  Section,
} from './StyledComponent';
import { TemplateList } from './TemplateList';
import { templateListData } from './templateListData';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


function App() {
  const baseURL = 'https://api.memegen.link/images/';
  const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [bottomLeftShift, setBottomLeftShift] = useState(0);
    const [bottomUpShift, setBottomUpShift] = useState(350);
    const [topLeftShift, setTopLeftShift] = useState(0);
    const [topUpShift, setTopUpShift] = useState(0);
    const [bottomColor, setBottomColor] = useState(true);
    const [topColor, setTopColor] = useState(true);
  const [imageName, setImageName] = useState('');
  const [image, setImage] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [imagePreviewIsSelected, setImagePreviewIsSelected] = useState(false);
  const [currentMeme, setCurrentMeme] = useState('');
  const [memeIsSelected, setMemeIsSelected] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIsSelected, setHistoryIsSelected] = useState(false);


    function getRandomImage() {
        const randNum = Math.floor(Math.random() * templateListData.length-1)
        suggestionSelected(templateListData[randNum]);
    }


  function modifyTextString(text) {
    const modifiedText = text
      .replaceAll('?', '~q')
      .replaceAll('&', '~a')
      .replaceAll('%', '~p')
      .replaceAll('#', '~h')
      .replaceAll('/', '~s')
      .replaceAll('\\', '~b')
      .replaceAll('<', '~l')
      .replaceAll('>', '~g')
      .replaceAll('"', "''")
      .replaceAll('_', '__')
      .replaceAll('  ', '_')
      .replaceAll(' ', '_')
      .replaceAll('-', '--');
    return modifiedText;
  }

  useEffect(() => {
    const savedHistory = localStorage.getItem('history');
    setHistory(JSON.parse(savedHistory) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

    
 async function generateMeme() {
    if (topText && bottomText) {
      const modTopText = modifyTextString(topText);
        const modBottomText = modifyTextString(bottomText);
        const customLink = `${baseURL}${image.id}/${modTopText}%2F${modBottomText}.png`;
       /* let memeEl = document.querySelector('.meme');
        let customLink;
        domtoimage.toBlob(memeEl)
            .then(function (blob) {
                
                const data = new FormData()
                data.append("file",blob)
                data.append("upload_preset", "u2hhub6n")
                data.append("cloud_name", "eathub")
                fetch("  https://api.cloudinary.com/v1_1/eathub/image/upload", {
                    method: "post",
                    body: data
                })
                    .then(resp => resp.json())
                    .then(data => {

                        console.log(data.url);
                      customLink = data.url;
                    })
                    .catch(err => console.log(err))
            });
        console.log("okk");
        console.log(customLink);*/

      const meme = {
        ...image,
        topText: topText,
        bottomText: bottomText,
        customLink: customLink,
        };
        //console.log(meme);
      const isInHistory = history.some(
        (entry) => customLink === entry.customLink,
      );
      let newHistory;
      if (!isInHistory) {
        newHistory = [...history, meme];
        setHistory(newHistory);
      }
      setCurrentMeme(meme);
      setImagePreviewIsSelected(false);
      setMemeIsSelected(true);
    } else {
      alert('Please choose an image and two lines of meme text.');
    }
  }


  function generatePreview(preview) {
    setImagePreview(`${baseURL}${preview.id}.png`);
    setMemeIsSelected(false);
    setImagePreviewIsSelected(true);
  }

    function downloadMeme() {
        let memeEl = document.querySelector('.meme');
        domtoimage.toBlob(memeEl)
            .then(function (blob) {
                saveAs(blob, 'meme.png');
            });
  }

  function suggestionSelected(suggestion) {
    setImage(suggestion);
    setImageName(suggestion.name);
    setSuggestions([]);
    generatePreview(suggestion);
  }

  return (
    <AppStyle>
      <HeaderOne>Meme Generator</HeaderOne>
      <Main>
        <Section width="calc(300px-2vw)">
          <Form>
            <InputWrapper>
              <Label htmlFor="top-text-meme">Top text</Label>
              <Input
                id="top-text-meme"
                value={topText}
                onChange={(event) => setTopText(event.currentTarget.value)}
              />
                      </InputWrapper>
                      <InputWrapper>
                      <Label htmlFor="top-text-style">Style Top text</Label>
                          <ButtonWrapper id="top-text-style">
                              <Button
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setTopColor(!topColor);
                                  }}
                              >
                                  Dark/Light
              </Button>
                              <Button
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setTopLeftShift(topLeftShift + 5);
                                  }}
                              >
                                  <ArrowForwardIcon />
              </Button>
                              <Button
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setTopLeftShift(topLeftShift - 5);
                                  }}
                              >
                                  <ArrowBackIcon />
              </Button>
                              <Button
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setTopUpShift(topUpShift + 5);
                                  }}
                              >
                                  <ArrowDownwardIcon />
              </Button>
                              <Button
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setTopUpShift(topUpShift - 5);
                                  }}
                              >
                                  <ArrowUpwardIcon />
              </Button>
                          </ButtonWrapper>
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="bottom-text-meme">Bottom text</Label>
              <Input
                id="bottom-text-type-meme"
                value={bottomText}
                onChange={(event) => setBottomText(event.currentTarget.value)}
              />
                      </InputWrapper>

                      <InputWrapper>
                          <Label htmlFor="bottom-text-style">Style Bottom text</Label>
                          <ButtonWrapper id="bottom-text-style">
                              <Button
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setBottomColor(!bottomColor);
                                  }}
                              >
                                  Dark/Light
              </Button>
                              <Button
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setBottomLeftShift(bottomLeftShift + 5);
                                  }}
                              >
                                  <ArrowForwardIcon />
                              </Button>
                              <Button
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setBottomLeftShift(bottomLeftShift - 5);
                                  }}
                              >
                                  <ArrowBackIcon />
                              </Button>
                              <Button
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setBottomUpShift(bottomUpShift + 5);
                                  }}
                              >
                                  <ArrowDownwardIcon />
                              </Button>
                              <Button
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setBottomUpShift(bottomUpShift - 5);
                                  }}
                              >
                                  <ArrowUpwardIcon />
                              </Button>
                          </ButtonWrapper>
                      </InputWrapper>

            <TemplateList
              imageName={imageName}
              setImageName={setImageName}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              suggestionSelected={suggestionSelected}
            />
            {imagePreviewIsSelected && (
              <PreviewWrapper>
                <PreviewImage src={imagePreview} alt={imageName} />
              </PreviewWrapper>
            )}
                      <ButtonWrapper>
                          <Button
                              onClick={(event) => {
                                  event.preventDefault();
                                  getRandomImage();
                              }}
                          >
                              Random
              </Button>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  generateMeme();
                }}
              >
                Preview
              </Button>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  setHistoryIsSelected((prev) => setHistoryIsSelected(!prev));
                }}
              >
                History
              </Button>
            </ButtonWrapper>
          </Form>
        </Section>
        <Section>
                  {memeIsSelected && (
                      <div style={{ position: "relative", }}>
                          <div className="meme">
                              <h1 style={{
                                  position: "absolute",
                                  top: `${topUpShift}px`,
                                  left: `${topLeftShift}px`,
                                  color: topColor ? "white" : "black",
                              }}>{topText && topText}</h1>
            <ImageWrapper>
              <Image src={currentMeme.customLink} alt={imageName} />
                              </ImageWrapper>

                              <h1 style={{
                                  position: "absolute",
                                  top: `${bottomUpShift}px`,
                                  left: `${bottomLeftShift}px`,
                                  color: bottomColor ? "white" : "black",}}>{bottomText && bottomText}</h1>
                              </div>
                          <Button style={{ marginTop: '10px', marginLeft: '20px' }}
                onClick={(event) => {
                  event.preventDefault();
                  downloadMeme();
                }}
              >
                          Download
              </Button>
                          </div>
          )}
        </Section>
        <Section>
                  {historyIsSelected && (

                      <InputWrapper>
                          <h3>History</h3>
                          {history.map((item) => (
                              <HistoryItem
                                  key={`${item.id}_${item.topText}_${item.bottomText}`}
                              >
                                  <HistoryImageWrapper>
                                      <HistoryImage src={item.customLink} />
                                  </HistoryImageWrapper>
                                  {item.name}
                              </HistoryItem>
                          ))}
                      </InputWrapper>

                  )}
        </Section>
      </Main>
    </AppStyle>
  );
}

export default App;
