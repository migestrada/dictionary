
function getMeaning (word) {
  const lastWord = sessionStorage.getItem('last-word')
  /**
    if (lastWord !== word) {
      const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
      const data = await response.json()
      sessionStorage.setItem('last-word', word)
    }
  **/

  console.log('AAAAAA')
  alert('Not working!')
}

window.addEventListener('DOMContentLoaded', () => {
  $('#input-word').on('blur', (event) => {
    const target = $(event.currentTarget)
    const value = target.val().trim()
    if (!value) {
      target.val('')
      target.removeClass('input-active')
      $('#search-button').removeClass('button-active')
    }
  })

  $('#input-word').on('focus', (event) => {
    $(event.currentTarget).addClass('input-active')
  })
  
  $('#input-word').on('input', (event) => {
    const target = $(event.currentTarget)
    const value = target.val().trim()
    if (value) {
      $('#search-button').addClass('button-active')
    }
  })

  $('#input-word').keypress((event) => {
    const target = $(event.currentTarget)
    const value = target.val().trim()

    if (event.which == 13 && value) {
      
    }
  });
})

window.onbeforeunload = function() {
  sessionStorage.clear();
}