import { useState, useEffect, useRef } from "react";
// import { submitInterviewAnswer } from "../../services/interviewApi";
import {
    submitInterviewAnswer,
    endInterview,
    skipInterviewQuestion
} from "../../services/interviewApi";
import "../../styles/interview/interviewQuestion.css";

function QuestionPanel({
    question,
    interviewId,
    currentQuestion,
    totalQuestions,
    stage,
    difficulty,
    onNextQuestion,
    onLoading,
    loading,
     onEndInterview,
      onLiveScoreChange,
      onTechnicalScoreChange,
onCommunicationScoreChange,
onConfidenceScoreChange
}) {

    const [answer, setAnswer] = useState("");
    const [isListening, setIsListening] = useState(false);
    // const [voiceText, setVoiceText] = useState("");
    // const voiceTextRef = useRef("");
    const [isSpeaking, setIsSpeaking] = useState(false);
      const voiceTextRef = useRef("");
    const shouldListenRef = useRef(false);
    const recognitionRef = useRef(null);

const speakQuestion = () => {

    if (!question) return;

    // Stop previous speech
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(question);

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => {
        console.log("🔊 AI QUESTION SPEAKING");
        setIsSpeaking(true);
    };

    speech.onend = () => {
        console.log("🔊 AI QUESTION SPEECH ENDED");
        setIsSpeaking(false);
    };

    speech.onerror = (error) => {
        console.error("🔊 Speech Error:", error);
        setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
};
useEffect(() => {

    if (!question) return;

    // Stop previous question speech
    window.speechSynthesis.cancel();

    const timer = setTimeout(() => {

        speakQuestion();

    }, 500);

    return () => {

        clearTimeout(timer);

        window.speechSynthesis.cancel();

    };

}, [question]);

const handleSubmit = async () => {

    console.log("🔥 SUBMIT BUTTON CLICKED");

    if (loading) {
        console.log("❌ Loading is true");
        return;
    }

    if (!interviewId) {
        console.log("❌ No interviewId");
        alert("Interview has not started.");
        return;
    }

    if (!answer.trim()) {
        console.log("❌ Empty answer");
        alert("Please enter your answer.");
        return;
    }

    try {

        onLoading?.(true);

        console.log("🔥 Calling submitInterviewAnswer...");
        console.log("Interview ID:", interviewId);
        console.log("Answer:", answer);

        const data = await submitInterviewAnswer({
            interviewId,
            answer
        });

        console.log("✅ BACKEND RESPONSE:", data);

        // Live score
        if (data.liveScore !== undefined) {

            console.log(
                "🔥 LIVE SCORE RECEIVED:",
                data.liveScore
            );

            onLiveScoreChange?.(
                data.liveScore
            );
        }
        // ==============================
// UPDATE CATEGORY SCORES
// ==============================

if (data.technicalScore !== undefined) {

    console.log(
        "🔥 TECHNICAL SCORE:",
        data.technicalScore
    );

    onTechnicalScoreChange?.(
        data.technicalScore
    );
}

if (data.communicationScore !== undefined) {

    console.log(
        "🔥 COMMUNICATION SCORE:",
        data.communicationScore
    );

    onCommunicationScoreChange?.(
        data.communicationScore
    );
}

if (data.confidenceScore !== undefined) {

    console.log(
        "🔥 CONFIDENCE SCORE:",
        data.confidenceScore
    );

    onConfidenceScoreChange?.(
        data.confidenceScore
    );
}
        

        if (
            data.interviewCompleted ||
            data.completed
        ) {

            alert("Interview Completed!");
            return;
        }

        if (data.nextQuestion) {

            console.log(
                "➡️ NEXT QUESTION:",
                data.nextQuestion
            );

            setAnswer("");
            voiceTextRef.current = "";

            onNextQuestion({
                question: data.nextQuestion,
                currentQuestion: data.currentQuestion,
                stage: data.stage
            });
        }

    } catch (error) {

        console.error(
            "❌ Submit Answer Error:",
            error
        );

        alert(error.message);

    } finally {

        onLoading?.(false);

    }
};
 const handleEndInterview = async () => {

        if (!interviewId) {
            alert("Interview has not started.");
            return;
        }

        const confirmEnd = window.confirm(
            "Are you sure you want to end the interview?"
        );

        if (!confirmEnd) {
            return;
        }

        try {

            onLoading?.(true);

            const data = await endInterview(interviewId);

            console.log("✅ INTERVIEW ENDED:", data);

            alert("Interview ended successfully.");

            window.speechSynthesis.cancel();

            shouldListenRef.current = false;

            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }

            setIsListening(false);

        } catch (error) {

            console.error("❌ End Interview Error:", error);

            alert(error.message);

        } finally {

            onLoading?.(false);

        }
    };



// ==============================
// SKIP CURRENT QUESTION
// ==============================

const handleSkip = async () => {

    if (loading) {
        return;
    }

    if (!interviewId) {
        alert("Interview has not started.");
        return;
    }

    try {

        onLoading?.(true);

        // Stop voice recognition
        shouldListenRef.current = false;

        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }

        setIsListening(false);

        // Clear answer
        setAnswer("");
        voiceTextRef.current = "";

        const data = await skipInterviewQuestion(
            interviewId
        );

        console.log(
            "⏭️ SKIP RESPONSE:",
            data
        );

        // If interview completed
        if (
            data.interviewCompleted ||
            data.completed
        ) {

            onEndInterview?.();

            return;
        }

        // Move to next question
        if (data.nextQuestion) {

            onNextQuestion?.({
                question: data.nextQuestion,
                currentQuestion: data.currentQuestion,
                stage: data.stage
            });

        }

    } catch (error) {

        console.error(
            "❌ Skip Question Error:",
            error
        );

        alert(error.message);

    } finally {

        onLoading?.(false);

    }
};


const handleVoice = () => {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert(
            "Voice recognition is not supported in this browser. Please use Google Chrome."
        );
        return;
    }

    // ==============================
    // STOP VOICE
    // ==============================

    if (isListening) {

        console.log("🛑 USER STOPPED VOICE");

        shouldListenRef.current = false;

        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        setIsListening(false);

        return;
    }

    // ==============================
    // PRESERVE EXISTING TEXT
    // ==============================

    const existingText = answer.trim();

    voiceTextRef.current = existingText;

    shouldListenRef.current = true;

    // ==============================
    // CREATE RECOGNITION
    // ==============================

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.lang = "en-US";

    // Continuous speech
    recognition.continuous = true;

    // Important:
    // We need interim results for live typing
    recognition.interimResults = true;

    recognition.maxAlternatives = 1;

    // ==============================
    // START
    // ==============================

    recognition.onstart = () => {

        console.log("🎤 Voice recognition started");

        setIsListening(true);

    };

    // ==============================
    // RESULT
    // ==============================

    recognition.onresult = (event) => {

        let finalText = "";
        let interimText = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const result = event.results[i];

            const transcript =
                result[0]?.transcript || "";

            if (result.isFinal) {

                finalText += transcript;

            } else {

                interimText += transcript;

            }
        }

        // ==============================
        // SAVE FINAL SPEECH
        // ==============================

        if (finalText.trim()) {

            voiceTextRef.current =
                `${voiceTextRef.current} ${finalText}`
                    .replace(/\s+/g, " ")
                    .trim()
                    .slice(0, 1000);

            console.log(
                "📝 FINAL VOICE TEXT:",
                voiceTextRef.current
            );
        }

        // ==============================
        // DISPLAY FINAL + LIVE SPEECH
        // ==============================

        const displayText =
            `${voiceTextRef.current} ${interimText}`
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 1000);

        setAnswer(displayText);

    };

    // ==============================
    // ERROR
    // ==============================

    recognition.onerror = (event) => {

        console.log(
            "🎤 Voice recognition error:",
            event.error
        );

        // These are normal browser speech events.
        // Don't erase the answer.

        if (event.error === "no-speech") {

            console.log(
                "🎤 No speech detected. Keeping voice active."
            );

            return;
        }

        if (event.error === "aborted") {

            console.log(
                "🎤 Recognition aborted."
            );

            return;
        }

        console.error(
            "❌ Voice recognition error:",
            event.error
        );

    };

    // ==============================
    // END
    // ==============================

    recognition.onend = () => {

        console.log(
            "🎤 Voice recognition ended"
        );

        // ==============================
        // AUTO RESTART
        // ==============================

        if (shouldListenRef.current) {

            console.log(
                "🔄 Restarting voice recognition..."
            );

            setTimeout(() => {

                if (!shouldListenRef.current) {
                    return;
                }

                try {

                    recognition.start();

                } catch (error) {

                    console.log(
                        "⚠️ Recognition restart skipped:",
                        error.message
                    );

                }

            }, 300);

        } else {

            setIsListening(false);

            recognitionRef.current = null;

        }
    };

    // ==============================
    // START RECOGNITION
    // ==============================

    try {

        recognition.start();

    } catch (error) {

        console.error(
            "❌ Could not start recognition:",
            error
        );

        shouldListenRef.current = false;

        setIsListening(false);

    }
};
return (

        <div className="interview-question-panel">

            {/* Header */}

            <div className="interview-question-header">

                <div className="interview-stage-badge">

                    {stage || "Interview"}

                </div>

                <div className="interview-question-right">

                    <span>
                        Question {currentQuestion} / {totalQuestions}
                    </span>

                    <span className="interview-difficulty">

                        {difficulty || "Medium"}

                    </span>

                </div>

            </div>


            {/* Question */}

            <div className="interview-question-card">

    <div className="interview-question-content">

        <h2>
            {question || "Waiting for question..."}
        </h2>

        <button
            type="button"
            className="interview-speak-question-btn"
            onClick={speakQuestion}
            disabled={!question}
        >
            {isSpeaking
                ? "🔊 Speaking..."
                : "🔊 Replay Question"
            }
        </button>

    </div>

</div>


            {/* Answer */}

            <textarea

                className="interview-answer-box"

                value={answer}

              onChange={(e) => {

    if (e.target.value.length <= 1000) {

        setAnswer(e.target.value);

        // Keep voice memory synchronized
        if (!isListening) {
            voiceTextRef.current = e.target.value;
        }

    }

}}
                placeholder="Start speaking or type your answer..."

            />


            {/* Toolbar */}

            <div className="interview-answer-toolbar">

                <div className="interview-toolbar-left">

                   <button
    type="button"
    className="interview-toolbar-btn"
    onClick={handleVoice}
>
    {isListening ? "🛑 Listening..." : "🎤 Voice"}
</button>

                    <button
                        type="button"
                        className="interview-toolbar-btn"
                    >

                        😊 Emoji

                    </button>

                </div>

                <span className="interview-word-count">

                    {answer.length} / 1000

                </span>

            </div>


            {/* Buttons */}

            <div className="interview-action-buttons">

                <button 
    type="button" 
    className="interview-skip-btn"
    onClick={handleSkip}
    disabled={!interviewId || loading}
>
    Skip
</button>
               <button
    type="button"
    className="interview-submit-btn"
    onClick={handleSubmit}
    disabled={!interviewId || loading}
>
    {loading ? "Submitting..." : "Submit"}
</button>

                <button 
    type="button" 
    className="interview-end-btn"
    onClick={handleEndInterview}
    disabled={!interviewId || loading}
>
    End
</button>
            </div>

        </div>

    );
}

export default QuestionPanel;