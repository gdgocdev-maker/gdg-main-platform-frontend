"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";
import styles from "./create-event.module.css";

type Question = {
  type: string;
  text: string;
  options?: string[];
};

export default function CreateEventPage() {
  

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventSpeakers, setEventSpeakers] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventMapsLink, setEventMapsLink] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [eventRequirements, setEventRequirements] = useState("");
  const [eventImage, setEventImage] = useState<File | null>(null);

  

  const [fullName, setFullName] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isGdgMember, setIsGdgMember] = useState("");


  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [options, setOptions] = useState<string[]>([""]);


  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");


  const choiceQuestionTypes = [
    "single-choice",
    "multiple-choice",
    "checkboxes",
  ];

  const resetQuestionForm = () => {
    setQuestionType("");
    setQuestionText("");
    setOptions([""]);
    setShowQuestionForm(false);
  };

  

  const handleAddQuestion = () => {
    setErrors([]);

    if (!questionType) {
      alert("Please select a question type.");
      return;
    }

    if (!questionText.trim()) {
      alert("Please enter your question.");
      return;
    }

    let questionOptions: string[] | undefined;

    if (questionType === "yes-no") {
      questionOptions = ["Yes", "No"];
    } else if (choiceQuestionTypes.includes(questionType)) {
      questionOptions = options
        .map((option) => option.trim())
        .filter((option) => option !== "");

      if (questionOptions.length < 2) {
        alert("Please add at least two options.");
        return;
      }
    }

    const newQuestion: Question = {
      type: questionType,
      text: questionText.trim(),
      ...(questionOptions ? { options: questionOptions } : {}),
    };

    setQuestions((prev) => [...prev, newQuestion]);

    resetQuestionForm();
  };


  const handleRemoveQuestion = (indexToRemove: number) => {
    setQuestions((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };


  const validateForm = () => {
    const newErrors: string[] = [];

    if (!eventTitle.trim()) {
      newErrors.push("Event name is required.");
    }

    if (!eventDescription.trim()) {
      newErrors.push("Event description is required.");
    }

    if (!eventDate) {
      newErrors.push("Event date is required.");
    }

    if (!eventTime) {
      newErrors.push("Event time is required.");
    }

    if (!eventLocation.trim()) {
      newErrors.push("Event location is required.");
    }

    if (!eventCapacity) {
      newErrors.push("Event capacity is required.");
    } else if (Number(eventCapacity) <= 0) {
      newErrors.push("Event capacity must be greater than 0.");
    }

    if (!registrationDeadline) {
      newErrors.push("Registration deadline is required.");
    }

    if (!eventImage) {
      newErrors.push("Event image is required.");
    }

    if (!fullName.trim()) {
      newErrors.push("Full name is required.");
    }

    if (!universityId.trim()) {
      newErrors.push("University ID is required.");
    }

    if (!college.trim()) {
      newErrors.push("College is required.");
    }

    if (!major.trim()) {
      newErrors.push("Major is required.");
    }

    if (!phoneNumber.trim()) {
      newErrors.push("Phone number is required.");
    }

    if (!email.trim()) {
      newErrors.push("Email address is required.");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newErrors.push("Please enter a valid email address.");
      }
    }

    if (!isGdgMember) {
      newErrors.push("Please select whether you are a GDG on Campus member.");
    }

    if (
      eventMapsLink.trim() &&
      !eventMapsLink.startsWith("http://") &&
      !eventMapsLink.startsWith("https://")
    ) {
      newErrors.push("Google Maps link must be a valid URL.");
    }

    if (
      registrationDeadline &&
      eventDate &&
      registrationDeadline > eventDate
    ) {
      newErrors.push(
        "Registration deadline cannot be after the event date."
      );
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  };


  const handlePreview = () => {
    setSuccessMessage("");

    const isValid = validateForm();

    if (!isValid) {
      alert(
        "Please complete the required fields before opening the preview."
      );
      return;
    }

    setShowPreview(true);
  };

 

  const handlePublish = () => {
    setSuccessMessage("");

    const isValid = validateForm();

    if (!isValid) {
      alert("Please fix the validation errors before publishing.");
      return;
    }

    const eventData = {
      title: eventTitle.trim(),
      description: eventDescription.trim(),
      speakers: eventSpeakers.trim(),
      date: eventDate,
      time: eventTime,
      location: eventLocation.trim(),
      mapsLink: eventMapsLink.trim(),
      capacity: Number(eventCapacity),
      registrationDeadline,
      requirements: eventRequirements.trim(),
      image: eventImage?.name ?? null,

      registrationInformation: {
        fullName: fullName.trim(),
        universityId: universityId.trim(),
        college: college.trim(),
        major: major.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        isGdgMember,
      },

      questions,
    };

   
    // This is where the real API call will go.
    console.log("Event data ready to publish:", eventData);

    setSuccessMessage(
      "Event information is valid and ready to be published."
    );

    alert("Event validated successfully!");
  };


  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel? All entered information will be lost."
    );

    if (!confirmed) return;

    setEventTitle("");
    setEventDescription("");
    setEventSpeakers("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setEventMapsLink("");
    setEventCapacity("");
    setRegistrationDeadline("");
    setEventRequirements("");
    setEventImage(null);

    setFullName("");
    setUniversityId("");
    setCollege("");
    setMajor("");
    setPhoneNumber("");
    setEmail("");
    setIsGdgMember("");

    setQuestions([]);
    resetQuestionForm();

    setErrors([]);
    setSuccessMessage("");
    setShowPreview(false);
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        {}

        <header className={styles.header}>
          <h1 className={styles.title}>Create Event</h1>

          <p className={styles.subtitle}>
            Create and publish an event for the GDG community.
          </p>
        </header>

        { }

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handlePublish();
          }}
        >
          { }

          <h2 className={styles.sectionTitle}>
            Event Information
          </h2>

          {}

          <div
            className={`${styles.colorGroup} ${styles.orangeGroup}`}
          >
            {}

            <div className={styles.field}>
              <label className={styles.label}>
                Event Name *
              </label>

              <input
                className={styles.input}
                type="text"
                placeholder="Enter event name"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>

            

            <div className={styles.field}>
              <label className={styles.label}>
                Description *
              </label>

              <textarea
                className={styles.textarea}
                placeholder="Write event description here..."
                value={eventDescription}
                onChange={(e) =>
                  setEventDescription(e.target.value)
                }
              />
            </div>

            

            <div className={styles.field}>
              <label className={styles.label}>
                Speakers (Optional)
              </label>

              <input
                className={styles.input}
                type="text"
                placeholder="Enter speaker names"
                value={eventSpeakers}
                onChange={(e) =>
                  setEventSpeakers(e.target.value)
                }
              />
            </div>
          </div>

          

          <div
            className={`${styles.colorGroup} ${styles.redGroup}`}
          >
            <div className={styles.row}>
              

              <div className={styles.field}>
                <label className={styles.label}>
                  Date *
                </label>

                <input
                  className={styles.input}
                  type="date"
                  value={eventDate}
                  onChange={(e) =>
                    setEventDate(e.target.value)
                  }
                />
              </div>

              

              <div className={styles.field}>
                <label className={styles.label}>
                  Time *
                </label>

                <input
                  className={styles.input}
                  type="time"
                  value={eventTime}
                  onChange={(e) =>
                    setEventTime(e.target.value)
                  }
                />
              </div>
            </div>

            <div className={styles.row}>
              

              <div className={styles.field}>
                <label className={styles.label}>
                  Location *
                </label>

                <input
                  className={styles.input}
                  type="text"
                  placeholder="Enter a location"
                  value={eventLocation}
                  onChange={(e) =>
                    setEventLocation(e.target.value)
                  }
                />
              </div>

              

              <div className={styles.field}>
                <label className={styles.label}>
                  Google Maps Link (Optional)
                </label>

                <input
                  className={styles.input}
                  type="url"
                  placeholder="Paste location link"
                  value={eventMapsLink}
                  onChange={(e) =>
                    setEventMapsLink(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Green Group */}

          <div
            className={`${styles.colorGroup} ${styles.greenGroup}`}
          >
            <div className={styles.row}>
              {/* Capacity */}

              <div className={styles.field}>
                <label className={styles.label}>
                  Capacity *
                </label>

                <input
                  className={styles.input}
                  type="number"
                  min="1"
                  placeholder="Enter maximum number of attendees"
                  value={eventCapacity}
                  onChange={(e) =>
                    setEventCapacity(e.target.value)
                  }
                />
              </div>
            </div>

            

            <div className={styles.field}>
              <label className={styles.label}>
                Registration Deadline *
              </label>

              <input
                className={styles.input}
                type="date"
                value={registrationDeadline}
                onChange={(e) =>
                  setRegistrationDeadline(e.target.value)
                }
              />
            </div>

            {/* Requirements */}

            <div className={styles.field}>
              <label className={styles.label}>
                Requirements (Optional)
              </label>

              <textarea
                className={styles.textarea}
                placeholder="Enter any requirements for attendees..."
                value={eventRequirements}
                onChange={(e) =>
                  setEventRequirements(e.target.value)
                }
              />
            </div>
          </div>

          {/* Blue Group */}

          <div
            className={`${styles.colorGroup} ${styles.blueGroup}`}
          >
            <div className={styles.field}>
              <label className={styles.label}>
                Event Image *
              </label>

              <div className={styles.uploadBox}>
                <ImagePlus className={styles.UploadIcon} />

                <span>
                  {eventImage
                    ? eventImage.name
                    : "Upload event image"}
                </span>

                <small>
                  Drag and drop files here, or click to browse
                </small>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setEventImage(file);
                  }}
                />
              </div>
            </div>
          </div>

          

          <h2 className={styles.sectionTitle}>
            Registration Information
          </h2>

          {/* Full Name */}

          <div className={styles.field}>
            <label className={styles.label}>
              Full Name *
            </label>

            <input
              className={styles.input}
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />
          </div>

          {/* University ID */}

          <div className={styles.field}>
            <label className={styles.label}>
              University ID *
            </label>

            <input
              className={styles.input}
              type="text"
              placeholder="e.g. 2286291"
              value={universityId}
              onChange={(e) =>
                setUniversityId(e.target.value)
              }
            />
          </div>

          {/* College / Major */}

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>
                College *
              </label>

              <input
                className={styles.input}
                type="text"
                placeholder="e.g. Computer Science and Engineering"
                value={college}
                onChange={(e) =>
                  setCollege(e.target.value)
                }
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Major *
              </label>

              <input
                className={styles.input}
                type="text"
                placeholder="e.g. Software Engineering"
                value={major}
                onChange={(e) =>
                  setMajor(e.target.value)
                }
              />
            </div>
          </div>

          {/* Phone / Email */}

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>
                Phone Number *
              </label>

              <input
                className={styles.input}
                type="tel"
                placeholder="5XXXXXXXX"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value)
                }
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Email Address *
              </label>

              <input
                className={styles.input}
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>
          </div>

          {/* GDG Member */}

          <div className={styles.field}>
            <label className={styles.label}>
              Are you a GDG on Campus Member? *
            </label>

            <div>
              <label className={styles.label}>
                <input
                  type="radio"
                  name="member"
                  value="yes"
                  checked={isGdgMember === "yes"}
                  onChange={(e) =>
                    setIsGdgMember(e.target.value)
                  }
                />
                Yes, I am a member
              </label>

              <label className={styles.label}>
                <input
                  type="radio"
                  name="member"
                  value="no"
                  checked={isGdgMember === "no"}
                  onChange={(e) =>
                    setIsGdgMember(e.target.value)
                  }
                />
                No, I am not a member
              </label>
            </div>
          </div>


          {questions.length > 0 && (
            <div className={styles.questionsSection}>
              <h3>Registration Questions</h3>

              {questions.map((question, index) => (
                <div
                  key={index}
                  className={styles.questionItem}
                >
                  <div>
                    <span>{index + 1}. </span>

                    <strong>{question.text}</strong>
                  </div>

                  {/* Yes / No */}

                  {question.type === "yes-no" && (
                    <div className={styles.questionOptions}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${index}`}
                        />
                        Yes
                      </label>

                      <label>
                        <input
                          type="radio"
                          name={`question-${index}`}
                        />
                        No
                      </label>
                    </div>
                  )}

                  {/* Single Choice */}

                  {question.type === "single-choice" &&
                    question.options?.map(
                      (option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={
                            styles.questionOption
                          }
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                          />

                          {option}
                        </label>
                      )
                    )}

                  {/* Multiple Choice */}

                  {question.type === "multiple-choice" &&
                    question.options?.map(
                      (option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={
                            styles.questionOption
                          }
                        >
                          <input type="checkbox" />

                          {option}
                        </label>
                      )
                    )}

                  {/* Checkboxes */}

                  {question.type === "checkboxes" &&
                    question.options?.map(
                      (option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={
                            styles.questionOption
                          }
                        >
                          <input type="checkbox" />

                          {option}
                        </label>
                      )
                    )}

                  {/* Short Answer */}

                  {question.type === "short-answer" && (
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Enter your answer"
                    />
                  )}

                  {/* Long Answer */}

                  {question.type === "long-answer" && (
                    <textarea
                      className={styles.textarea}
                      placeholder="Enter your answer"
                    />
                  )}

                  <button
                    type="button"
                    className={styles.removeOption}
                    onClick={() =>
                      handleRemoveQuestion(index)
                    }
                  >
                    Remove Question
                  </button>
                </div>
              ))}
            </div>
          )}

         

          <div className={styles.questionsSection}>
            <button
              type="button"
              className={styles.addQuestion}
              onClick={() => {
                setSuccessMessage("");
                setShowQuestionForm(true);
              }}
            >
              + Add more questions
            </button>
          </div>

          {/* Question Form */}

          {showQuestionForm && (
            <div className={styles.questionForm}>
              <h3 className={styles.questionTitle}>
                Add Registration Question
              </h3>

              {/* Question Type */}

              <div className={styles.field}>
                <label className={styles.label}>
                  Question Type
                </label>

                <select
                  className={styles.input}
                  value={questionType}
                  onChange={(e) =>
                    setQuestionType(e.target.value)
                  }
                >
                  <option value="">
                    Select question type
                  </option>

                  <option value="short-answer">
                    Short Answer / Text
                  </option>

                  <option value="long-answer">
                    Long Answer
                  </option>

                  <option value="multiple-choice">
                    Multiple Choice
                  </option>

                  <option value="single-choice">
                    Single Choice
                  </option>

                  <option value="checkboxes">
                    Checkboxes
                  </option>

                  <option value="yes-no">
                    Yes / No
                  </option>
                </select>
              </div>

              {/* Question */}

              <div className={styles.field}>
                <label className={styles.label}>
                  Question
                </label>

                <input
                  className={styles.input}
                  type="text"
                  placeholder="Enter your question"
                  value={questionText}
                  onChange={(e) =>
                    setQuestionText(e.target.value)
                  }
                />
              </div>

              {/* Options */}

              {choiceQuestionTypes.includes(
                questionType
              ) && (
                <div className={styles.field}>
                  <label className={styles.label}>
                    Options
                  </label>

                  {options.map((option, index) => (
                    <div
                      key={index}
                      className={styles.optionRow}
                    >
                      <input
                        className={styles.input}
                        type="text"
                        value={option}
                        placeholder={`Option ${
                          index + 1
                        }`}
                        onChange={(e) => {
                          const updatedOptions = [
                            ...options,
                          ];

                          updatedOptions[index] =
                            e.target.value;

                          setOptions(updatedOptions);
                        }}
                      />

                      {options.length > 1 && (
                        <button
                          type="button"
                          className={
                            styles.removeOption
                          }
                          onClick={() => {
                            setOptions(
                              options.filter(
                                (_, optionIndex) =>
                                  optionIndex !==
                                  index
                              )
                            );
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className={styles.addOption}
                    onClick={() =>
                      setOptions([
                        ...options,
                        "",
                      ])
                    }
                  >
                    + Add option
                  </button>
                </div>
              )}

              {/* Question Actions */}

              <div className={styles.questionActions}>
                <button
                  type="button"
                  className={styles.cancelQuestion}
                  onClick={resetQuestionForm}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className={styles.addQuestionButton}
                  onClick={handleAddQuestion}
                >
                  Add Question
                </button>
              </div>
            </div>
          )}

          

          {errors.length > 0 && (
            <div
              className={styles.errorMessage}
              role="alert"
            >
              <strong>
                Please fix the following:
              </strong>

              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Success */}

          {successMessage && (
            <div
              className={styles.successMessage}
              role="status"
            >
              {successMessage}
            </div>
          )}

          

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="button"
              className={styles.previewButton}
              onClick={handlePreview}
            >
              Preview
            </button>

            <button
              type="submit"
              className={styles.publishButton}
            >
              Publish Event
            </button>
          </div>
        </form>

       
        {showPreview && (
          <div className={styles.previewOverlay}>
            <div className={styles.previewModal}>
              {/* Preview Header */}

              <div className={styles.previewHeader}>
                <h2>Event Preview</h2>

                <button
                  type="button"
                  onClick={() =>
                    setShowPreview(false)
                  }
                  className={styles.closePreview}
                  aria-label="Close preview"
                >
                  ×
                </button>
              </div>

              {/* Preview Content */}

              <div className={styles.previewContent}>
                {/* Image */}

                {eventImage && (
                  <div>
                    <img
                      src={URL.createObjectURL(
                        eventImage
                      )}
                      alt="Event preview"
                      style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                  </div>
                )}

                <h3>Event Information</h3>

                <div className={styles.previewInfo}>
                  <p>
                    <strong>Title:</strong>{" "}
                    {eventTitle || "—"}
                  </p>

                  <p>
                    <strong>Description:</strong>{" "}
                    {eventDescription || "—"}
                  </p>

                  <p>
                    <strong>Speakers:</strong>{" "}
                    {eventSpeakers || "—"}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {eventDate || "—"}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {eventTime || "—"}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {eventLocation || "—"}
                  </p>

                  {eventMapsLink && (
                    <p>
                      <strong>Google Maps:</strong>{" "}
                      <a
                        href={eventMapsLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Location
                      </a>
                    </p>
                  )}

                  <p>
                    <strong>Capacity:</strong>{" "}
                    {eventCapacity || "—"}
                  </p>

                  <p>
                    <strong>
                      Registration Deadline:
                    </strong>{" "}
                    {registrationDeadline || "—"}
                  </p>

                  <p>
                    <strong>Requirements:</strong>{" "}
                    {eventRequirements || "—"}
                  </p>
                </div>

                {/* Registration Information */}

                <h3>Registration Information</h3>

                <div className={styles.previewInfo}>
                  <p>
                    <strong>Full Name:</strong>{" "}
                    {fullName || "—"}
                  </p>

                  <p>
                    <strong>University ID:</strong>{" "}
                    {universityId || "—"}
                  </p>

                  <p>
                    <strong>College:</strong>{" "}
                    {college || "—"}
                  </p>

                  <p>
                    <strong>Major:</strong>{" "}
                    {major || "—"}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {phoneNumber || "—"}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {email || "—"}
                  </p>

                  <p>
                    <strong>GDG Member:</strong>{" "}
                    {isGdgMember === "yes"
                      ? "Yes"
                      : isGdgMember === "no"
                      ? "No"
                      : "—"}
                  </p>
                </div>

                {/* Questions */}

                {questions.length > 0 && (
                  <div
                    className={
                      styles.previewQuestions
                    }
                  >
                    <h3>Registration Questions</h3>

                    {questions.map(
                      (question, index) => (
                        <div
                          key={index}
                          className={
                            styles.previewQuestion
                          }
                        >
                          <strong>
                            {index + 1}.{" "}
                            {question.text}
                          </strong>

                          {question.type ===
                            "yes-no" && (
                            <div
                              className={
                                styles.previewOptions
                              }
                            >
                              <span>
                                ○ Yes
                              </span>

                              <span>
                                ○ No
                              </span>
                            </div>
                          )}

                          {question.type ===
                            "single-choice" &&
                            question.options?.map(
                              (
                                option,
                                optionIndex
                              ) => (
                                <div
                                  key={
                                    optionIndex
                                  }
                                  className={
                                    styles.previewOptions
                                  }
                                >
                                  ○ {option}
                                </div>
                              )
                            )}

                          {question.type ===
                            "multiple-choice" &&
                            question.options?.map(
                              (
                                option,
                                optionIndex
                              ) => (
                                <div
                                  key={
                                    optionIndex
                                  }
                                  className={
                                    styles.previewOptions
                                  }
                                >
                                  □ {option}
                                </div>
                              )
                            )}

                          {question.type ===
                            "checkboxes" &&
                            question.options?.map(
                              (
                                option,
                                optionIndex
                              ) => (
                                <div
                                  key={
                                    optionIndex
                                  }
                                  className={
                                    styles.previewOptions
                                  }
                                >
                                  □ {option}
                                </div>
                              )
                            )}

                          {question.type ===
                            "short-answer" && (
                            <div
                              className={
                                styles.previewOptions
                              }
                            >
                              <span>
                                Short answer
                              </span>
                            </div>
                          )}

                          {question.type ===
                            "long-answer" && (
                            <div
                              className={
                                styles.previewOptions
                              }
                            >
                              <span>
                                Long answer
                              </span>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Preview Actions */}

              <div
                className={
                  styles.previewActions
                }
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowPreview(false)
                  }
                  className={
                    styles.cancelButton
                  }
                >
                  Back to Edit
                </button>

                <button
                  type="button"
                  className={
                    styles.publishButton
                  }
                  onClick={handlePublish}
                >
                  Publish Event
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}