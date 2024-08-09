$(document).ready(() => {
  $('.blueable').on('click', (e) => {
    const currentSrc = $(e.currentTarget).attr('src');
    let newSrc;

    if (currentSrc.includes('_blue')) {
      newSrc = currentSrc.replace('_blue', '');
    } else {
      const dotIndex = currentSrc.lastIndexOf('.');
      newSrc = `${currentSrc.substring(0, dotIndex)}_blue${currentSrc.substring(dotIndex)}`;
    }

    $(e.currentTarget).attr('src', newSrc);
  });
});
