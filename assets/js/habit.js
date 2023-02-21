const toggleSwitch = document.getElementById('toggle-switch');
const view = document.getElementById('view');

toggleSwitch.addEventListener('change', (event) => {
  if (event.target.checked) {
    view.innerHTML = '<%- include(\'_day_view\') -%>';
  } else {
    view.innerHTML = '<%- include(\'_week_view\') -%>';
  }
});