"use client";

import { useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import type { CommitteeEvent, EventType } from "../shared/types";

const styles = {
  page: "min-h-screen w-full bg-[#f5f7fb] px-3 py-5 text-[#1f2937] md:px-6 md:py-10",
  modalOverlay: "fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-slate-900/65 p-4 backdrop-blur-sm",
  modalCard: "relative max-h-[calc(100vh-2rem)] overflow-y-auto",
  modalClose: "absolute end-5 top-5 z-[1] grid size-9 place-items-center rounded-[10px] border border-gray-300 bg-white text-gray-700",
  requiredBadge: "ms-2 inline-block rounded-full bg-red-100 px-2 py-[3px] text-[11px] font-bold text-red-700",
  card: "mx-auto w-full max-w-[900px] overflow-hidden rounded-[14px] bg-white px-[22px] py-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] sm:px-12 sm:py-10",
  header: "bg-gradient-to-br from-[#4285f4] via-[#ea4335] to-[#fbbc04] px-6 py-5 text-white sm:px-[30px]",
  title: "m-0 text-[26px] font-bold text-[#202124] sm:text-[32px]",
  subtitle: "mt-2 text-[15px] text-[#00050f]",
  form: "flex flex-col gap-5",
  sectionTitle: "mb-[5px] mt-[25px] text-[21px] font-bold text-[#202124]",
  colorGroup: "mb-7 rounded-sm border-s-4 ps-[14px] max-sm:p-[18px]",
  orangeGroup: "border-s-[#f5a623]",
  redGroup: "border-s-[#a71b09]",
  greenGroup: "border-s-[#45a85b]",
  blueGroup: "border-s-[#4285f4]",
  row: "mb-1 grid grid-cols-1 gap-6 md:grid-cols-2",
  field: "mb-[22px] flex flex-col gap-2",
  label: "mb-0.5 text-sm font-semibold text-gray-700",
  input: "box-border min-h-[46px] w-full rounded-[10px] border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 transition placeholder:text-gray-400 focus:border-[#4285f4] focus:outline-none focus:ring-[3px] focus:ring-blue-500/10",
  textarea: "box-border min-h-[110px] w-full resize-y rounded-[10px] border border-gray-300 bg-white px-3.5 py-3 font-[inherit] text-sm text-gray-800 transition placeholder:text-gray-400 focus:border-[#4285f4] focus:outline-none focus:ring-[3px] focus:ring-blue-500/10",
  uploadBox: "relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-blue-300 bg-white p-[30px] text-center transition hover:border-[#4285f4] hover:bg-blue-50",
  UploadIcon: "size-[34px] text-[#4285f4]",
  questionsSection: "flex flex-col gap-[15px]",
  questionForm: "rounded-2xl border border-gray-200 bg-neutral-50 p-6",
  questionTitle: "m-0 mb-5 text-lg font-bold text-[#202124]",
  questionHelp: "-mt-1.5 mb-1 text-[13px] leading-[1.5] text-gray-600",
  questionItem: "rounded-[14px] border border-gray-200 bg-white p-[18px]",
  questionOptions: "mt-2 flex flex-col gap-6",
  questionOption: "mt-2 flex items-center gap-2 text-sm text-gray-700",
  optionRow: "mb-2.5 flex items-center gap-2.5 max-sm:flex-col max-sm:items-stretch",
  addQuestion: "w-fit border-0 bg-transparent py-2 text-sm font-semibold text-[#4285f4] hover:underline",
  addOption: "w-fit rounded-lg border border-[#4285f4] bg-white px-3.5 py-[9px] text-[13px] font-semibold text-[#4285f4] hover:bg-blue-50",
  removeOption: "rounded-lg border border-red-300 bg-white px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50",
  questionActions: "mt-5 flex justify-end gap-2.5 max-sm:flex-col",
  cancelQuestion: "rounded-[9px] border border-gray-300 bg-white px-[18px] py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50",
  addQuestionButton: "rounded-[9px] bg-[#4285f4] px-[18px] py-2.5 text-sm font-semibold text-white hover:bg-[#3367d6]",
  actions: "mt-[30px] flex items-center justify-end gap-3 border-t border-gray-200 pt-[25px] max-sm:flex-col-reverse max-sm:items-stretch",
  cancelButton: "min-w-[120px] rounded-[10px] border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 max-sm:w-full",
  previewButton: "min-w-[120px] rounded-[10px] border border-[#4285f4] bg-white px-5 py-3 text-sm font-semibold text-[#4285f4] hover:bg-blue-50 max-sm:w-full",
  publishButton: "min-w-[120px] rounded-[10px] bg-[#4285f4] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3367d6] max-sm:w-full",
  errorMessage: "mt-2.5 rounded-xl border border-red-200 bg-red-50 px-[18px] py-4 text-sm leading-[1.6] text-red-800 [&_strong]:mb-2 [&_strong]:block [&_strong]:text-[15px] [&_ul]:m-0 [&_ul]:ps-5 [&_li]:mb-1 [&_li:last-child]:mb-0",
  successMessage: "mt-2.5 rounded-xl border border-green-200 bg-green-50 px-[18px] py-4 text-sm leading-[1.6] text-green-700",
  previewOverlay: "fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-900/60 p-3 backdrop-blur-sm sm:p-[25px]",
  previewModal: "flex max-h-[95vh] w-full max-w-[800px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:max-h-[90vh] sm:rounded-[20px]",
  previewHeader: "flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5 [&_h2]:m-0 [&_h2]:text-[22px] [&_h2]:text-[#202124]",
  closePreview: "flex size-9 items-center justify-center rounded-full bg-gray-100 text-2xl leading-none text-gray-700 hover:bg-gray-200",
  previewContent: "overflow-y-auto p-[18px] sm:p-[25px] [&_h3]:mb-4 [&_h3]:mt-0 [&_h3]:text-lg [&_h3]:text-[#202124] [&_h3:not(:first-child)]:mt-7 [&_img]:mb-[25px] [&_img]:block [&_img]:max-h-[300px] [&_img]:w-full [&_img]:rounded-xl [&_img]:object-cover",
  previewInfo: "mb-5 flex flex-col gap-2 [&_p]:m-0 [&_p]:rounded-lg [&_p]:bg-[#f8f9fa] [&_p]:px-[13px] [&_p]:py-[11px] [&_p]:text-sm [&_p]:leading-[1.5] [&_p]:text-gray-700 [&_strong]:font-semibold [&_strong]:text-[#202124] [&_a]:font-semibold [&_a]:text-[#4285f4] [&_a]:no-underline [&_a:hover]:underline",
  previewQuestions: "mt-[25px]",
  previewQuestion: "mb-3.5 rounded-xl border border-gray-200 bg-white p-4 [&_strong]:mb-2.5 [&_strong]:block [&_strong]:text-sm [&_strong]:text-[#202124]",
  previewOptions: "mt-2 flex flex-col gap-1.5 text-sm text-gray-600",
  previewActions: "flex justify-end gap-3 border-t border-gray-200 bg-white p-4 sm:px-6 sm:py-[18px] max-sm:flex-col",
} as const;

type Question = {
  type: string;
  text: string;
  options?: string[];
  required: true;
};

const requiredRegistrantFields = [
  "Full name",
  "University ID",
  "College",
  "Major",
  "Phone number",
  "Email address",
  "GDG on Campus membership",
];

type CreateEventInput = Omit<CommitteeEvent, "id" | "created" | "updated">;

interface CreateEventFormProps {
  isModal?: boolean;
  onClose?: () => void;
  onCreate?: (event: CreateEventInput) => void;
}

export function CreateEventModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: CreateEventInput) => void;
}) {
  if (!isOpen) return null;
  return <CreateEventForm isModal onClose={onClose} onCreate={onCreate} />;
}

function CreateEventForm({ isModal = false, onClose, onCreate }: CreateEventFormProps) {

  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState<EventType>("Workshop");
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
      required: true,
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
      return;
    }

    setShowPreview(true);
  };

 

  const handlePublish = () => {
    setSuccessMessage("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const eventData: CreateEventInput = {
      title: eventTitle.trim(),
      description: eventDescription.trim(),
      type: eventType,
      date: eventDate,
      time: eventTime,
      location: eventLocation.trim(),
      speakers: eventSpeakers.trim(),
      mapsLink: eventMapsLink.trim(),
      capacity: Number(eventCapacity),
      registrationDeadline,
      requirements: eventRequirements.trim(),
      imageUrl: eventImage ? URL.createObjectURL(eventImage) : undefined,
      registered: 0,
      status: "Upcoming",
      isDraft: false,
      requiredRegistrantFields,
      registrationQuestions: questions.map((question, index) => ({
        ...question,
        id: `registration-question-${Date.now()}-${index}`,
      })),
    };

    onCreate?.(eventData);

    setSuccessMessage(
      "Event information is valid and ready to be published."
    );
    setShowPreview(false);
    if (onCreate) onClose?.();
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

    setEventType("Workshop");

    setQuestions([]);
    resetQuestionForm();

    setErrors([]);
    setSuccessMessage("");
    setShowPreview(false);
    if (isModal) onClose?.();
  };

  useEffect(() => {
    if (!isModal || !onClose) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModal, onClose]);

  return (
    <main
      className={isModal ? styles.modalOverlay : styles.page}
      onMouseDown={(event) => {
        if (isModal && event.target === event.currentTarget) onClose?.();
      }}
    >
      <section className={`${styles.card} ${isModal ? styles.modalCard : ""}`}>
        {}

        <header className={styles.header}>
          <h1 className={styles.title}>Create Event</h1>

          <p className={styles.subtitle}>
            Create and publish an event for the GDG community.
          </p>
        </header>

        {isModal && (
          <button
            type="button"
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close event creation dialog"
          >
            <X size={20} />
          </button>
        )}

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

            <div className={styles.field}>
              <label className={styles.label}>Event Type *</label>
              <select
                className={styles.input}
                value={eventType}
                onChange={(e) => setEventType(e.target.value as EventType)}
              >
                <option value="Workshop">Workshop</option>
                <option value="Conference">Conference</option>
                <option value="Talk">Talk</option>
                <option value="Panel">Panel</option>
                <option value="Hackathon">Hackathon</option>
              </select>
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
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
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

          

          {questions.length > 0 && (
            <div className={styles.questionsSection}>
              <h3>Registration Questions</h3>
              <p className={styles.questionHelp}>
                Attendees answer these required questions when they register.
                The preview below is read-only for the event creator.
              </p>

              {questions.map((question, index) => (
                <div
                  key={index}
                  className={styles.questionItem}
                >
                  <div>
                    <span>{index + 1}. </span>

                    <strong>{question.text}</strong>
                    <span className={styles.requiredBadge}>Required for attendees</span>
                  </div>

                  {/* Yes / No */}

                  {question.type === "yes-no" && (
                    <div className={styles.questionOptions}>
                      <label>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          disabled
                        />
                        Yes
                      </label>

                      <label>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          disabled
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
                            disabled
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
                          <input type="checkbox" disabled />

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
                          <input type="checkbox" disabled />

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
                      disabled
                    />
                  )}

                  {/* Long Answer */}

                  {question.type === "long-answer" && (
                    <textarea
                      className={styles.textarea}
                      placeholder="Enter your answer"
                      disabled
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
                    <strong>Event Type:</strong> {eventType}
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
                  {requiredRegistrantFields.map((field) => (
                    <p key={field}>
                      <strong>{field} *</strong>{" "}
                      <span>Answered by the attendee during registration</span>
                    </p>
                  ))}
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
                          <span className={styles.requiredBadge}>
                            Required
                          </span>

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
