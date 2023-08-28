$(document).ready(function () {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('noteUpdated') === 'true') {
      $('#updateSuccessModal').modal('show');
    }
  });

