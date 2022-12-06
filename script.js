async function getMeaning (word) {
  const lastWord = sessionStorage.getItem('last-word')
  $('#card-container').html('')
  $('#content').toggleClass('d-none')
  $('#loader').toggleClass('d-none')

  const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
  const data = await response.json()
  if (data.message) {
    alert(data.message)
  } else {
    const meanings = data.reduce((acum, info) => {
      info.meanings.forEach((meaning) => {
        console.log(meaning)
        if (!acum[meaning.partOfSpeech]) acum[meaning.partOfSpeech] = []
        const definitions = Object.values(meaning.definitions).map(({ definition }) => definition)
        acum[meaning.partOfSpeech].push(...definitions)
      });

      return acum
    }, {});

    
    Object.keys(meanings).forEach((key, index) => {
      $('#card-container').append(`
        <div class="item-xs-12 item-md-6 item-lg-3">
          <div id="card-${index}" class="card">
            <div class="card-title">
              ${key.toUpperCase()}
            </div>
            <div id="card-body-${index}" class="card-body">
            </div>
          </div>
        </div>
      `)

      $(`#card-body-${index}`).append('<ul></ul>')
      meanings[key].forEach(text => {
        $(`#card-body-${index}`).find('ul').append(`<br/><li>${text}</li>`)
      })
    })
  }

  $('#content').toggleClass('d-none')
  $('#loader').toggleClass('d-none')
}

window.addEventListener('DOMContentLoaded', () => {
  $('body').on('blur', '#input-word', function() {
    const value = $(this).val().trim()
    if (!value) {
      $(this).val('')
      $(this).removeClass('input-active')
      $('#search-button').removeClass('button-active')
    }
  })

  $('body').on('focus', '#input-word', function() {
    if (!$(this).hasClass('input-active')) {
      $(this).addClass('input-active')
    }
  })
  
  $('body').on('input', '#input-word', function (event) {
    const value = $(this).val().trim()
    if (value) {
      $('#search-button').addClass('button-active')
    }
  })

  $('body').on('keypress', '#input-word', function(event) {
    if (event.which == 13 && value) {
      $('#search-button').trigger('click')
    }
  });

  $('body').on('click', '#search-button', function() {
    const value = $('#input-word').val().trim()
    getMeaning(value)
  })
})

window.onbeforeunload = function() {
  sessionStorage.clear();
}