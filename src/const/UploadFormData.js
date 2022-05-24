const UploadFormData = [
  {
    name: "departments",
    type: "select",
    label: "Select Department",
    placeholder: "For ex QA,UI..",
    departments: ["Marketing", "Design", "Development"],
  },
  {
    name: "cname",
    type: "autocomplete",
    label: "Course",
    placeholder: "Name of Course",
  },
  {
    name: "videourl",
    type: "file",
    label: "Uplaod Video",
    placeholder: "VideoUrl",
  },
  {
    name: "instructorname",
    type: "text",
    label: "Instructor Name",
    placeholder: "Full Name",
  },

  {
    name: "topicname",
    type: "text",
    label: "Topic",
    placeholder: "Name of Topic",
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Description",
  },
  {
    name: "assesmenturl",
    type: "text",
    label: "Assesment Url",
    placeholder: "Assesment Url",
  },
];

export default UploadFormData;
