import styles from "./style.module.scss"
import React, {useState} from "react";

interface IFAQ {
    question: string
    answer: string
}

export default function FAQ() {

    const [openedQuestion, setOpenedQuestion] = useState<null | number>(null)

    const data: IFAQ[] = [
        {
            question: "How does the burning of USDT-WXG or USDC-WXG work in the app?",
            answer: "When you create strokes while drawing, a small amount of USDT-WXG or USDC-WXG tokens is burned and becomes part of the artwork's history. This burning process adds a dynamic and interactive element to the drawing experience, allowing your emotions to manifest visually through the utilization of blockchain technology."
        },
        {
            question: "Is the burning of tokens reversible or permanent?",
            answer: "The burning of tokens is a permanent action that cannot be reversed. Once a stroke is made and tokens are burned, it becomes an integral part of the artwork's narrative. This permanent nature ensures the authenticity and immutability of the emotions expressed during the creation process, making each stroke a significant contribution to the shared history of the artwork."
        },
        {
            question: "How can I view the history of emotions associated with a specific artwork?",
            answer: "Each artwork within the app comes with a captivating mood history feature. This feature provides a visual timeline of the emotional journey captured during the artwork's creation. By exploring the mood history, you can witness the evolution of emotions and the collective artistic spirit that shaped the final outcome, giving you a deeper understanding of the artwork's narrative and the feelings it represents."
        },
        {
            question: "Is there a limit to the number of artworks I can create or participate in?",
            answer: "There are no limitations on your artistic endeavors within the app. You can freely create and participate in as many artworks as your imagination desires. Express yourself without boundaries, explore various themes, and collaborate with others to unlock a world of artistic possibilities. The app is designed to encourage your creative exploration and empower you to leave your mark on the digital canvas."
        },
        {
            question: "Are there any guidelines or restrictions for the content of the drawings?",
            answer: "We promote an environment of artistic freedom while maintaining a respectful and inclusive community. While creating your artwork, we kindly request that you refrain from including offensive or inappropriate content that may infringe upon the rights and sensibilities of others. By fostering a supportive and positive atmosphere, we ensure that every user feels comfortable and inspired to express their emotions through art."
        },
        {
            question: "Is there a leaderboard or recognition for exceptional artworks?",
            answer: "Yes, we believe in recognizing and celebrating exceptional artistic achievements within our community. Our app features a dedicated section to showcase outstanding artworks. These selected pieces, chosen based on their creativity, emotional impact, and artistic merit, serve as inspiration for others and provide recognition to the talented individuals behind them. We encourage you to strive for artistic excellence and have the opportunity to be recognized for your contributions."
        },
        {
            question: "How much does it cost to draw 1 pixel?",
            answer: "The cost of drawing 1 pixel is 0.01 WXG. Unleash your creativity and bring your artwork to life, pixel by pixel, at an affordable price. Start painting and let your imagination run wild without worrying about excessive expenses."
        }
    ]

    return <div className={`container`}>
        <div className={"title"}>FAQ</div>
        <ul className={styles.list}>
            {data.map( (e, i) => {
                return  <li
                    className={`${styles.element} ${i === openedQuestion ? styles.opened : ""}`}
                    onClick={ e => setOpenedQuestion(i)}>
                    <div className={`${styles.question} ${styles.question}`}>{e.question}</div>
                    <div className={`${styles.answer} ${styles.answer}`}>{e.answer}</div>
                </li>
            })}
        </ul>
    </div>

}