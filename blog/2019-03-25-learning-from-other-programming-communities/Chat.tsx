import React from 'react'
import {Wide} from 'components'
import styled from 'styled-components'
import { take } from 'lodash'

enum ChatState {
  WaitingToSend,
  Sending,
  WaitingForResponse
}

interface State {
  chatScriptIndex: number
  chatState: ChatState
}

export class Chat extends React.Component<{}, State> {
  messagesRef: React.RefObject<HTMLDivElement>

  constructor(props: {}) {
    super(props)

    this.messagesRef = React.createRef()

    this.state = {
      chatScriptIndex: 0,
      chatState: ChatState.WaitingToSend
    }
  }

  showLatestMessage = () => {
    const { current: messages } = this.messagesRef
    if (messages) {
      messages.scroll({ top: messages.scrollHeight })
    }
  }

  submitClicked = () => {
    if (this.state.chatScriptIndex < chatScript.length) {
      this.setState(
        {
          chatState: ChatState.Sending,
          chatScriptIndex: this.state.chatScriptIndex + 1
        },
        () => {
          this.showLatestMessage()
          setTimeout(
            () =>
              this.setState({ chatState: ChatState.WaitingForResponse }, () => {
                setTimeout(() => {
                  this.setState({
                    chatState: ChatState.WaitingToSend
                  })
                  this.showLatestMessage()
                }, 100)
              }),
            1000
          )
        }
      )
    }
  }

  render() {
    const { chatState, chatScriptIndex } = this.state
    return (
      <Wide>
        <Wrapper>
          <div className="responsive-html5-chat">
            <form className="chat" onSubmit={e => e.preventDefault()}>
              <span
                className={chatState === ChatState.Sending ? 'spinner' : ''}
              />
              <div className="messages" ref={this.messagesRef}>
                <div className="message">
                  <div className="ash">
                    <p>
                      Hey, want to chat about native iOS "versus" JavaScript?
                    </p>
                  </div>
                </div>
                {take(chatScript, chatScriptIndex).map((s, index) => (
                  <>
                    <div key={`reader${index}`} className="message">
                      <div className="reader">{s.response}</div>
                    </div>
                    {(chatState === ChatState.WaitingToSend ||
                      index < chatScriptIndex - 1) &&
                      s.message && (
                        <div key={`ash${index}`} className="message">
                          <div className="ash">{s.message}</div>
                        </div>
                      )}
                  </>
                ))}
              </div>
              <div id="input">
                {chatState === ChatState.WaitingToSend && chatScriptIndex < chatScript.length && (
                  <p>{chatScript[chatScriptIndex].response}</p>
                )}
              </div>
              <input type="submit" value="Send" onClick={this.submitClicked} />
            </form>
          </div>
        </Wrapper>
      </Wide>
    )
  }
}

const appleBlue = '#2668d0'

// TODO: This could be moved into styled-components. Meh.
const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;

  /* Make everything animate because animations are cool. */
  form.chat * {
    transition: all 0.5s;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  form.chat {
    margin: 15px 0;
    cursor: default;
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE/Edge */
    user-select: none;

    .messages {
      display: block;
      overflow-x: hidden;
      overflow-y: scroll;
      position: relative;
      height: 85%;
      width: 100%;
      padding: 2% 3%;
      border-bottom: 1px solid #ecf0f1;
    }

    /* Customize the scrollbar to look like Messages.app */
    ::-webkit-scrollbar {
      width: 3px;
      height: 1px;
      transition: all 0.5s;
      z-index: 10;
    }
    ::-webkit-scrollbar-track {
      background-color: white;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #bec4c8;
      border-radius: 3px;
    }

    /* Basic message formatting. */
    .message {
      display: block;
      width: 98%;
      padding: 0.5%;
      p {
        line-height: 20px;
        margin: 0;
        padding: 10px 0;
      }
    }
    .reader,
    .ash {
      word-wrap: break-word;
      margin-bottom: 20px;
      position: relative;
      padding: 0px 15px;
      color: white;
      border-radius: 25px;
      clear: both;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 15px;
      max-width: 90%;
    }

    /* Formatting specific to "my" messages. */
    .reader {
      background: ${appleBlue};
      color: white;
      float: right;
      clear: both;
      border-bottom-right-radius: 20px 0px;
    }
    .reader:before {
      content: '';
      position: absolute;
      z-index: 1;
      bottom: -2px;
      right: -8px;
      height: 19px;
      border-right: 20px solid ${appleBlue};
      border-bottom-left-radius: 16px 14px;
      -webkit-transform: translate(0, -2px);
      transform: translate(0, -2px);
      border-bottom-left-radius: 15px 0px;
      transform: translate(-1px, -2px);
    }
    .reader:after {
      content: '';
      position: absolute;
      z-index: 1;
      bottom: -2px;
      right: -42px;
      width: 12px;
      height: 20px;
      background: white;
      border-bottom-left-radius: 10px;
      -webkit-transform: translate(-30px, -2px);
      transform: translate(-30px, -2px);
    }

    /* Formatting specific to "their" messages */
    .ash {
      background: #e5e5ea;
      color: black;
      float: left;
      clear: both;
      border-bottom-left-radius: 30px 0px;
    }
    .ash:before {
      content: '';
      position: absolute;
      z-index: 2;
      bottom: -2px;
      left: -7px;
      height: 19px;
      border-left: 20px solid #e5e5ea;
      border-bottom-right-radius: 16px 14px;
      -webkit-transform: translate(0, -2px);
      transform: translate(0, -2px);
      border-bottom-right-radius: 15px 0px;
      transform: translate(-1px, -2px);
    }
    .ash:after {
      content: '';
      position: absolute;
      z-index: 3;
      bottom: -2px;
      left: 4px;
      width: 26px;
      height: 20px;
      background: white;
      border-bottom-right-radius: 10px;
      -webkit-transform: translate(-30px, -2px);
      transform: translate(-30px, -2px);
    }

    /* Formatting for the input at the bottom. */
    #input {
      font-size: 15px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      border: 0;
      padding: 0 10px;
      height: 15%;
      outline: 0;

      display: table;
      width: calc(100% - 60px);
      float: left;
      p {
        color: black;
        display: table-cell;
        vertical-align: middle;
        line-height: 20px;
        margin: 0;
      }
    }
    input[type='submit'] {
      font-size: 15px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      border: 0;
      padding: 0 15px;
      height: 15%;
      outline: 0;

      width: 60px;
      background: transparent;
      color: #0072c6;
      font-weight: 700;
      text-align: right;
      float: right;
    }

    /* "Spinner" really means "loading indicator" here. */
    span.spinner {
      -moz-animation: loading-bar 0.5s 1;
      -webkit-animation: loading-bar 0.5s 1;
      animation: loading-bar 0.5s 1;
      display: block;
      height: 2px;
      background-color: ${appleBlue};
      transition: width 0.2s;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 4;
    }
  }

  /* Loading bar animation */
  @-moz-keyframes loading-bar {
    0% {
      width: 0%;
    }
    90% {
      width: 90%;
    }
    100% {
      width: 100%;
    }
  }
  @-webkit-keyframes loading-bar {
    0% {
      width: 0%;
    }
    90% {
      width: 90%;
    }
    100% {
      width: 100%;
    }
  }
  @keyframes loading-bar {
    0% {
      width: 0%;
    }
    90% {
      width: 90%;
    }
    100% {
      width: 100%;
    }
  }
`

interface ChatScript {
  response: JSX.Element
  message: JSX.Element
}

const chatScript = [
  {
    response: <p>Yeah. What exactly makes JavaScript so awesome?</p>,
    message: (
      <p>
        The best thing about JavaScript is its ecosystem. It is <em>huge</em>.
        And it's vibrant: JavaScript developers feel like they own their own
        platform, and consequently, there's a lot of experimentation. Most ideas
        are bad, but the successful ones get institutionalized as best
        practices. Over time, momentum grows.
      </p>
    )
  },
  {
    response: <p>What do you mean about momentum?</p>,
    message: (
      <p>
        Think about this: JavaScript development tools are often written{' '}
        <em>in</em> JavaScript. As soon as a tool gets built, it's able to be
        used to build more tools.
      </p>
    )
  },
  {
    response: <p>That sounds kind of dizzying. Is that why the JavaScript ecosystem seems to move so quickly?</p>,
    message:<p>Aye, that's a big part of it. JavaScript itself and <a href='https://www.npmjs.com'>npm</a> also encourage the creation of many, single-purpose tools. It is overwhelming. A brand new React Native codebase has <em>hundreds</em> of dependencies.</p>,
  },
  {
    response:
    <p>That sounds pretty sketchy. What about the scaffolding metaphor from earlier? Don't all those packages collapse under their own weight?</p>,
    message:
    <p>Sometimes they do 😬 It's happened a few times now, and the JavaScript ecosystem is always developing new tools and practices to deal with the complexity. The community is huge, so there's a lot of impetus to make it all work. Sometimes it feels to me like a "too big to fail" kind of situation.</p>,
  },
  {
    response: <p>That sounds awful.</p>,
    message:
    <p>You're right to be skeptical. The JavaScript ecosystem can't easily be decoupled from your development flow, either. It's really weird to think about building a Node.js server, for example, without using npm. In iOS, lots of folks still don't use a dependency manager. It's just a different perspective.</p>,
  },
  {
    response: <p>I hadn't thought about that.</p>,
    message:
    <p>It's interesting, isn't it? I think of JavaScript as a crucible: hard constraints, like the need for absolute backwards compatibility across decades of browsers, have fostered creativity in the community.</p>,
  },
  {
    response: <p>Don't things get really fragmented?</p>,
    message:
    <p>Yeah, they do. But fragmentation isn't always bad, either. JavaScript allows for specialization in a way that iOS can't: consider two core contributors to <a href='https://babeljs.io'>Babel</a> and <a href='https://prettier.io'>Prettier</a> (two important OSS projects). They might never interact at all because the two tools are so different, but they <em>do</em> both get to use the same tools. JavaScript encourages fragmentation in useful ways, too.</p>,
  },
  {
    response: <p>But the language just moves so fast!</p>,
    message: <p>Well, so does Swift.</p>,
  },
  {
    response:
    <p>Touché. Are you now going to tell me everything wrong with native iOS development?</p>,
    message:
    <p>No, I always like to start on a positive note. Apple's tools for common development workflows are <em>exceptionally</em> well-polished. For example, Apple's app performance instrumentation tool is the best I've ever seen.</p>,
  },
  {
    response: <p>Yeah, Instruments.app is great.</p>,
    message:
    <p>And because Apple owns the platform, they can be opinionated about their tools. Opinionated software can be really good.</p>,
  },
  {
    response: <p>That's true!</p>,
    message:
    <p>Unfortunately, Apple's opinions about developer tooling are often not that good.</p>,
  },
  {
    response: <p>Wait, what do you mean?</p>,
    message:
    <p>Apple's tooling reflects Apple's priorities; they make Instruments.app really amazing because they care that we build performant apps. That's great! But Apple's unit testing tools are... pretty awful to compared to <a href='https://jestjs.io'>Jest</a>. Apple doesn't prioritize unit testing – that's their opinion, and if you disagree with it, that's not Apple's problem.</p>,
  },
  {
    response: <p>What's so wrong about Xcode's unit testing tools?</p>,
    message:
    <p>I wrote a <a href='https://ashfurrow.com/blog/apple-releases-jive/'>whole blog post about this</a>, go check it out. It's not a fair comparison, granted: Jest benefits from being used by such a huge community in web front-ends, servers, and command-line tools. XCTest gets used by the relatively small iOS developer community. However, the blog post goes into detail about low-hanging fruit that would make a huge difference. It's got radars you can dupe.</p>,
  },
  {
    response: <p>How else are the native iOS tools different?</p>,
    message:
    <p>Apple builds tools for workflows that already exist, or that Apple invents. Their tools can be difficult to build community tools on top of. Take the new Xcode extensions API: it's very limited. Compare that to Visual Studio Code's extensions API, which is so capable that it has enabled entirely <em>new kinds</em> of developer tools get built.</p>,
  },
  {
    response: <p>Yeah, I still miss Alcatraz.</p>,
    message: <p>Me too.</p>,
  },
  {
    response:
    <p>Does the size disparity mean that the JavaScript ecosystem will always have better tools?</p>,
    message:
    <p>"Better" is a value judgement – they are different. JavaScript development tools have to do a lot more than iOS tools, which get to be more focused and have <em>way</em> lower barriers-to-entry. We're just analyzing those differences. Next, let's think about specialization.</p>,
  },
  {
    response: <p>Okay...</p>,
    message:
    <p>Specialization can be really useful. Many of Apple's APIs are so stable, and cross such a wide spectrum of levels of abstraction, that there are iOS developers who <em>just</em> focus on the AVFoundation or CoreAnimation frameworks. Specialists can create <em>incredibly</em> polished software, and that kind of deep specialization is pretty uncommon among JavaScript developers.</p>,
  },
  {
    response: <p>Whoa, yeah.</p>,
    message:
    <p>However, specialized skills are difficult to apply to a broad range of tasks.</p>,
  },
  {
    response: <p>That's bad.</p>,
    message:
    <p>But they enable very rich, user-centric designs to spring to life and delight users.</p>,
  },
  {
    response: <p>That's good!</p>,
    message:
    <p>But when you have a problem, and Apple doesn't care about <em>that</em> problem, it really sucks.</p>,
  },
  {
    response: <p>That's bad.</p>,
    message:
    <p>Despite this, open source contributors have built some very impressive iOS tools.</p>,
  },
  {
    response: <p>That's good!</p>,
    message:
    <p>But Apple's mishandling of Swift Package Manager has sucked a lot of enthusiasm out of this community.</p>,
  },
  {
    response: <p>That's bad.</p>,
    message: <p>It is what it is.</p>,
  },
  {
    response: <p>... can I go now?</p>,
    message: <p>😉</p>,
  },
  {
    response: <p>Hey, I just figured out what this bit is a reference too.</p>,
    message:
    <p>Yeah, I'm a sucker for early Simpsons jokes. <a href='https://youtu.be/Krbl911ZPBA?t=22'>Here's the source material</a>.</p>,
  },
  {
    response: <p>We've gotten off-topic.</p>,
    message: <p>Right, sorry.</p>,
  },
  {
    response: <p>Any other big advantages to native iOS development?</p>,
    message:
    <p>Yes. I have to give huge props to Apple for using their authoritative position within the community to make it really easy to learn how to build working software.</p>,
  },
  {
    response: <p>What kind of tools?</p>,
    message:
    <p>In my Core Data workshops, one of the first things we do is create a project with a Core Data Xcode template and examine it. Or take <a href='https://www.apple.com/swift/playgrounds/'>Swift Playgrounds</a> for example. They make sure it's <em>really</em> easy to build apps for their platform.</p>,
  },
  {
    response: <p>It sounds almost... selfish, when you say it like that.</p>,
    message:
    <p>Life is complicated. I can recognize when Apple has an agenda which happens to align with my own.</p>,
  },
  {
    response: <p>I guess...</p>,
    message:
    <p>Apple's problems aren't our problems. That's a value-neutral statement, so if you have feelings about it, interrogate them. I guarantee you'll learn something.</p>,
  },
  {
    response: <p>Okay so what else is wrong with native iOS development?</p>,
    message:
    <p>It's slow. But this slowness is often only apparent when you've used something better.</p>,
  },
  {
    response: <p>What do you mean?</p>,
    message:
    <p>JavaScript developer tooling is very sophisticated (if unpolished). Hot module reloading and Jest's watch mode enable software development at the speed of thought. iOS development is like a painter who makes a brush stroke and has to wait fifteen seconds to see that change to their painting.</p>,
  },
  {
    response: <p>That's kind of harsh.</p>,
    message:
    <p>🤷‍♂️ It's how I feel. It's hard to go back from a world where I see my changes and test results <em>instantly</em>.</p>,
  },
  {
    response: <p>Are the tools really that good?</p>,
    message:
    <p>Yes. 'Not-invented here syndrome' doesn't hold much purchase among JavaScript developers.</p>,
  },
  {
    response: <p>You're saying it does with iOS developers?</p>,
    message:
    <p>Not nearly like it used to. I've been so happy to see the community nourish a tool-focused open source community that brings Apple's sense of polish to building their own tools. <a href='https://github.com/krzysztofzablocki/Sourcery'>Sourcery</a>, <a href='https://github.com/realm/jazzy'>Jazzy</a>, <a href='https://github.com/JohnSundell/Marathon'>Marathon</a>. I could go on – and don't forget amazing commercial tools like <a href='https://revealapp.com'>Reveal</a> or <a href='http://injectionforxcode.com'>Injection for Xcode</a>.</p>,
  },
  {
    response: <p>It's pretty impressive, what the community has accomplished.</p>,
    message:
    <p>I'm proud of it. Let's move on: another reality is that native iOS programming languages can't be used much outside native iOS software development.</p>,
  },
  {
    response: <p>But what about Swift on the server?</p>,
    message:
    <p>I knew this would come up, eventually 😅 Swift on the server is fighting an uphill battle against frameworks with years of momentum behind them. It can be fun to build server apps in Swift, but it's much rougher experience compared to the alternatives. You've got to approach it like an adventure; however, sometimes we don't want an adventure, we just want to be productive. iOS developers sometimes ask me for advice on building their first server, and I steer them away from using Swift. They are more likely to accomplish their goals and avoid getting discouraged and quitting if they learn Sinatra or Express.</p>,
  },
  {
    response: <p>I guess it all depends, doesn't it?</p>,
    message:
    <p>That's right! Software development is all about managing trade-offs. The iOS community is way smaller. That's okay! There are advantages to being smaller, too. Knowing what the trade-offs are will only help us navigate them better.</p>,
  },
  {
    response:
    <p>Okay, so what are the disadvantages of JavaScript development? In this comparison to iOS, I mean.</p>,
    message:
    <p>Yeah, totally. Remember Xcode's awesome project templates? No such thing exists on JavaScript. At all. There is literally no defined starting place 😱 Since there is no platform owner, there is no default <em>anything</em>. JavaScript's infinite possibilities often lead to analysis-paralysis. It leads to developers blaming themselves when their tools don't work. Constant framework churn leaves the industry littered with codebases whose dependencies are hopelessly outdated. And let's not forget the heavy influence that corporate open source holds over the entire ecosystem.</p>,
  },
  {
    response: <p>Wait, what?</p>,
    message:
    <p>Facebook makes React, React Native, Jest, Yarn, and loads more. Microsoft makes Visual Studio Code and TypeScript. Even the beloved npm is backed by venture capitalists, who are expecting a return on their investments. That's even scarier than bloated node_modules directories, personally. Any of these companies can make a decision motivated by their own agenda and cause major problems for the developer community. In some ways, it's preferable to have Apple as a single platform owner. Let's extend the rent-vs-own metaphor from earlier: JavaScript might be homeowners, but they still pay a mortgage.</p>,
  },
  {
    response: <p>That sounds awful.</p>,
    message:
    <p>It is what it is. I do corporate open source for Artsy, which is also venture-backed.</p>,
  },
  {
    response: <p>Well, Artsy isn't a backbone of the JavaScript ecosystem 😜</p>,
    message:
    <p>Ha, that's true. Earlier, I asked you to keep an open mind. That doesn't mean giving up critical thought, though. And I do think about this stuff.</p>,
  },
  {
    response: <p>I think that's a good place to wrap it up.</p>,
    message:
    <p>Yeah, hey thanks for the discussion! It felt great to engage with such a curious interlocutor.</p>,
  },
  {
    response: <p>Well, you're quite eloquent yourself.</p>,
    message: <p>Alright, take care.</p>,
  },
  {
    response: <p>See ya.</p>
  }
] as ChatScript[]
