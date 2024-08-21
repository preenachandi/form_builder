// Function to handle tab switching
function openSection(evt, sectionName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(sectionName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Click on default tab
document.getElementById("defaultOpen").click();

// Drag and drop functionality
const controls = document.querySelectorAll('[draggable="true"]');
const dropArea = document.getElementById('dropArea');

controls.forEach(control => {
  control.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('type', control.getAttribute('data-type'));
  });
});

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  let element;

  switch (type) {
    case 'input':
      element = document.createElement('div');
      element.className = 'mb-4';
      element.innerHTML = `<label class="block text-gray-700 text-sm font-bold mb-2">Input Label:</label>
                               <input type="text" class="border p-2 rounded w-full">`;
      break;
    case 'dropdown':
      element = document.createElement('div');
      element.className = 'mb-4';
      element.innerHTML = `<label class="block text-gray-700 text-sm font-bold mb-2">Dropdown Label:</label>
                             <select class="border p-2 rounded w-full">
                               <option>Option 1</option>
                               <option>Option 2</option>
                             </select>`;
      break;
    case 'radio':
      element = document.createElement('div');
      element.className = 'mb-4';
      element.innerHTML = `<label class="block text-gray-700 text-sm font-bold mb-2">Radio Label:</label>
                           <label class="inline-flex items-center">
                               <input type="radio" name="radioGroup" class="mr-2">Option 1
                           </label>
                           <label class="inline-flex items-center">
                               <input type="radio" name="radioGroup" class="mr-2">Option 2
                           </label>`;
      break;
    case 'textarea':
      element = document.createElement('div');
      element.className = 'mb-4';
      element.innerHTML = `<label class="block text-gray-700 text-sm font-bold mb-2">Text Area Label:</label>
                           <textarea class="border p-2 rounded w-full" rows="4"></textarea>`;
      break;
    case 'button':
      element = document.createElement('button');
      element.textContent = 'Submit';
      element.className = 'bg-blue-500 text-white p-2 rounded';
      break;
  }
  dropArea.appendChild(element);
});

// Preview functionality
document.getElementById('preview').addEventListener('click', () => {
  const mainDiv = document.getElementById('main');
  const dragDiv = document.getElementById("drag-div");
  dragDiv.style.display = "none";
  const mainTittle = document.getElementById("main-tittle");
  const mainTittleValue = mainTittle.value;
  const previewArea = document.createElement('div');
  previewArea.className = 'p-[30px] mt-[15px] bg-white rounded-md shadow-md';
  previewArea.id = 'preview-div'
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = dropArea.innerHTML;
  const elementsToRemove = tempDiv.querySelectorAll('.Drag');
  elementsToRemove.forEach(el => el.remove());
  previewArea.innerHTML = `<h2 class="text-xl font-bold text-center mb-4">${mainTittleValue}</h2>` + tempDiv.innerHTML;

  // Clear previous preview and append new one
  const existingPreview = mainDiv.querySelector('.form-preview');
  if (existingPreview) {
    existingPreview.remove();
  }
  previewArea.classList.add('form-preview');
  mainDiv.appendChild(previewArea);
  const previewbuttonDiv = document.getElementById('preview');
  previewbuttonDiv.innerHTML = "Save"

});

//cancle preview
document.getElementById('cancel').addEventListener('click', () => {
  const dragDiv = document.getElementById("drag-div");
  dragDiv.style.display = "flex";
  const previewDiv = document.getElementById("preview-div");
  previewDiv.style.display = "none";
  const previewbuttonDiv = document.getElementById('preview');
  previewbuttonDiv.innerHTML = "Preview"
});

