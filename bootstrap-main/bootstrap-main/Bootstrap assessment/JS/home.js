// import { PORT, URL } from "../constants";
export const PORT = 7060
export const API_URL = 'https://localhost'
const mock = [
  {
    CurrentAddress: 'Harda$$Harda$Madhya Pradesh$461331',
    PermanentAddress: 'Harda$$Harda$Madhya Pradesh$461331',
    CollegeId: 'IGEC',
    CollegeName: 'indira gandhi',
    Courses: {
      btech: 'CS, IT, MECH',
      'm tech': 'CS, IT, MECH',
    },
    registrationDate: '2024-08-04T18:15:55.256Z',
    EmailId: 'Parasharashi02@gmail.com',
    ContactNumber: '961 795 3882',
    DocumentNumber: '5546',
    DocumentType: 'Identity Card',
    Nationality: 'Indian',
    registrationId: 'inIG2024',
  },
  {
    CurrentAddress: 'Harda$$Harda$Madhya Pradesh$461331',
    PermanentAddress: 'Harda$$Harda$Madhya Pradesh$461331',
    CollegeId: 'IGEC',
    CollegeName: 'indira gandhi',
    Courses: {
      btech: 'CS, IT, MECH',
      'm tech': 'CS, IT, MECH',
    },
    RegistrationDate: '2024-08-04T18:15:55.256Z',
    EmailId: 'Parasharashi02@gmail.com',
    ContactNumber: '961 795 3882',
    DocumentNumber: '5546',
    DocumentType: 'Identity Card',
    Nationality: 'Indian',
    RegistrationId: 'inIG2024',
  },
]

const fetchdata = async () => {
  const response = await fetch(`${API_URL}:${PORT}/api/College`)
  const data = await response.json()
  return data
}

const tableBody = document.querySelector('tbody')
const handleDelete = async (collegeId) => {
  try {
    const response = await fetch(`${API_URL}:${PORT}/api/College/${collegeId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // Remove the row from the table
      document.querySelector(`button[data-id="${collegeId}"]`).closest('tr').remove();
      alert('College record deleted successfully');
    } else {
      alert('Failed to delete college record');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while deleting the record');
  }
};
const renderTable = (data) => {
  data.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${item.registrationId}</td>
      <td>${item.collegeName}</td>
      <td>${item.emailId}</td>
      <td>${item.contactNumber}</td>
      <td>${item.registrationDate}</td>
      <td>
        <a href="../HTML/register.html?id=${item.collegeId}">
          <button class="btn btn-secondary btn-sm me-2">
            <i class="bi bi-pencil-square me-1"></i>Edit
          </button>
        </a>
        <button class="btn btn-secondary btn-sm delete-btn" data-id="${item.collegeId}">
          <i class="bi bi-trash3-fill me-1"></i>Delete
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Add event listeners to all delete buttons
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
      const collegeId = button.getAttribute('data-id');
      handleDelete(collegeId);
    });
  });
};

// Function to fetch college data and render the table
const fetchColleges = async () => {
  try {
    const response = await fetch(`${API_URL}:${PORT}/api/College`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      renderTable(data);
    } else {
      console.error('Failed to fetch college data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Fetch and render college data on page load
fetchColleges();

// mock.map((data, index) => {
//   const row = document.createElement('tr')
//   row.innerHTML = `<th scope="row ">${index + 1}</th>
//             <td>${data.registrationId}</td>
//             <td>${data.CollegeName}</td>
//             <td>${data.EmailId}</td>
//             <td>${data.ContactNumber}</td>
//             <td>${data.registrationDate}</td>
//             <td><a href="../HTML/register.html?id=${data.CollegeId}">
//               <button class="btn btn-secondary btn-sm me-2">
//                 <i class="bi bi-pencil-square me-1"></i>Edit
//               </button></a>
//               <button class="btn btn-secondary btn-sm">
//                 <i class="bi bi-trash3-fill me-1"></i>Delete
//               </button>
//             </td>`
//   tableBody.appendChild(row)
// })
