import React, { useEffect, useRef, useState } from 'react'
import MessageDate from '../components/MessageDate'
import SameSenderMessage from './SameSenderMessage'
import Message from './Message'
import ServerInput from './ServerInput'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export default function ServerMessages({ activeChannelName }) {
  const [messages, setMessages] = useState([])

  const dummy = useRef()

  useEffect(() => {
    const messagesQuery = query(
      collection(db, activeChannelName),
      orderBy('createdAt')
    )

    const unsub = onSnapshot(messagesQuery, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push(doc.data())
      })
      setMessages(messages)
    })

    return () => {
      unsub()
    }
  }, [activeChannelName])

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="h-full">
      <div className="bg-main-gray h-[calc(100svh-117px)] pb-5 overflow-y-scroll chatbar text-overlay-text">
        <div className="m-4 mb-6">
          {/* <div className="h-[68px] w-[68px] rounded-full bg-gray-12 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              viewBox="0 0 576 512"
            >
              <path
                fill="#ffffff"
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
              />
            </svg>
          </div> */}
          <h3 className="text-white font-bold text-[32px] leading-10 mt-[7px] mb-[6px] m600:text-[25px]">
            Welcome to {activeChannelName}
          </h3>
          <div className="text-secondary-gray">
            This is the start of the {activeChannelName} channel.
          </div>
        </div>

        <div>
          {messages &&
            messages.map((message) => {
              let isSameSender, firstMessageDate

              let newDay = false

              let thisIndex = messages.indexOf(message)

              let currentDate = new Date()

              let messageDate = new Date(message.createdAt.seconds * 1000)

              let formattedTime = messageDate.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })

              let dayDiff = currentDate.getDate() - messageDate.getDate()
              let monthDIff = currentDate.getMonth() - messageDate.getMonth()
              let yearDiff =
                currentDate.getFullYear() - messageDate.getFullYear()

              if (yearDiff > 0 || monthDIff > 0) {
                dayDiff += 50
              }

              let newDayDateFormat = messageDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })

              if (thisIndex === 0) {
                isSameSender = false
                newDay = true
              } else {
                isSameSender =
                  message.displayName === messages[thisIndex - 1].displayName

                if (
                  new Date(message.createdAt.seconds * 1000).getDay() !==
                  new Date(
                    messages[thisIndex - 1].createdAt.seconds * 1000
                  ).getDay()
                ) {
                  newDay = true
                }
              }

              if (dayDiff === 0) {
                firstMessageDate = 'Today at ' + formattedTime
              } else if (dayDiff === 1) {
                firstMessageDate = 'Yesterday at ' + formattedTime
              } else if (dayDiff > 1) {
                firstMessageDate =
                  messageDate.toLocaleDateString('en-US') + ' ' + formattedTime
              } else {
                firstMessageDate = formattedTime
              }

              return (
                <div key={crypto.randomUUID()}>
                  {newDay && (
                    <MessageDate newDayDateFormat={newDayDateFormat} />
                  )}

                  {isSameSender && !newDay ? (
                    <SameSenderMessage
                      formattedTime={formattedTime}
                      msg={message.text}
                    />
                  ) : (
                    <Message
                      sender={message.displayName}
                      date={firstMessageDate}
                      msg={message.text}
                    />
                  )}
                </div>
              )
            })}
          <span ref={dummy}></span>
        </div>
      </div>
      <ServerInput activeChannelName={activeChannelName} dummy={dummy} />
    </div>
  )
}
