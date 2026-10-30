const studentName = document.querySelector("#student-name");
const studentImage = document.querySelector("#student-image");

const addStudent = async (event) => {
  event.preventDefault();

  // Upload Image to Supabase Bucket

  const studentUpload = studentImage.files[0];

  if (studentUpload.size > 2000000) {
    alert("Image size must not exceed 2 MB. Please select a smaller image.");
    return;
  }

  const uploadResponse = await supabaseClient.storage
    .from("students_images")
    .upload(
      `students-profile-images/img-${Date.now()}-${studentUpload.name}`,
      studentUpload,
    );

  if (uploadResponse.error) {
    console.log(uploadResponse.error);
    return;
  }

  // Image upload hone ky baad image ka Link nikalna

  const linkResponse = await supabaseClient.storage
    .from("students_images")
    .getPublicUrl(uploadResponse.data.path);

  const imageURL = linkResponse.data.publicUrl;

  console.log(imageURL);

  return;

  const studentResponse = await supabaseClient.from("students").insert({
    student_name: studentName.value,
    image_path: studentImage.value,
  });

  console.log(studentResponse);
};
