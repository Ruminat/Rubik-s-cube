Array.from(document.querySelectorAll('.cube-solution'))
  .map(s => {
    return s.innerHTML = s.innerHTML
      .replace(/(\d)(\w)/ig, '$2<sup>$1</sup>')
      .replace(/(\d)\(([^\)]+)\)/ig, '($2)<sup>$1</sup>')
      .replace(/(\d)\[([^\]]+)\]/ig, '[$2]<sup>$1</sup>')
  })
