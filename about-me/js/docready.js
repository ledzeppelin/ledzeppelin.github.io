$(document).ready(() => {
  function createPDFYearFrag(year, startMonth, endMonth) {
    const monthsAbbr = [
      'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
    ];

    const frag = $(document.createDocumentFragment());
    for (let i = startMonth; i <= endMonth; i += 1) {
      frag.append(
        $('<li/>').append(
          $('<a/>', {
            text: monthsAbbr[i],
            href: `./about-me/analytics_pdfs/${year}/${monthsAbbr[i]}.pdf`,
          }),
        ),
      );
    }

    return $('<li/>').append(
      year,
      $('<ul/>', { class: 'ul-inline' }).append(
        frag,
      ),
    );
  }

  function createPDFYearsFrag() {
    const frag = $(document.createDocumentFragment());
    frag.append(
      // createPDFYearFrag(2025, 0, 11),
      createPDFYearFrag(2024, 3, 4),
    );
    return frag;
  }

  $('#analytics-pdfs').html(createPDFYearsFrag());

  const labelDark = 'rgb(221, 221, 232)';
  const labelDarkAlpha = 'rgba(221, 221, 232, .5)'; // adjust alpha based on how chart looks
  const secondaryLabelDark = 'rgb(149, 149, 157)';
  const separatorDark = 'rgba(104, 104, 111, .6)';

  // https://stackoverflow.com/a/76677890
  function getGradient(ctx, chartArea) {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top,
    );
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.25, 'transparent');
    gradient.addColorStop(1, labelDarkAlpha);
    return gradient;
  }

  const datapoints = [
    [128, "Apr '24"],
    [1700, ""],
    [2200, "May '24"],
    // [2000, "Jun '24"],
    // [4000, "Jul '24"],
    // [8000, "Aug '24"],
    // [8000, "Sep '24"],
    // [8000, "Oct '24"],
    // [8000, "Nov '24"],
    // [8000, "Dec '24"],
  ];

  // Instructions to cut over from month to year
  //
  // once end of 2024, blank out all but first month
  // then set autoSkip: false to ensure year is always shown
  // if running out of room, change 2024 to '24 or increment by every 2 years
  // const datapoints = [
  //   [128, '2024'], [1000, ''],
  //   [2000, ''], [4000, ''],
  //   [8000, ''], [8000, ''],
  //   [8000, ''], [8000, ''],
  //   [8000, ''],

  //   [128, '2025'], [1000, ''],
  //   [2000, ''], [4000, ''],
  //   [8000, ''], [8000, ''],
  //   [8000, ''], [8000, ''],
  //   [8000, ''], [1000, ''],
  //   [2000, ''], [4000, ''],
  //   [8000, ''], [8000, ''],
  //   [8000, ''], [8000, ''],
  //   [8000, ''],

  //   [128, '2026'], [1000, ''],
  //   [2000, ''], [4000, ''],
  //   [8000, ''], [8000, ''],
  //   [8000, ''], [8000, ''],
  //   [8000, ''], [1000, ''],
  //   [2000, ''], [4000, ''],
  //   [8000, ''], [8000, ''],
  //   [8000, ''], [8000, ''],
  //   [8000, ''],
  // ];

  const xLabels = datapoints.map((item) => item[1]);
  const monthlyCnt = datapoints.map((item) => item[0]);

  const data = {
    labels: xLabels,
    datasets: [
      {
        label: 'Cubic interpolation (monotone)',
        data: monthlyCnt,
        borderColor: labelDark,
        borderWidth: 1.5,
        fill: true,
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) {
            return 'black';
          }
          return getGradient(ctx, chartArea);
        },
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
    ],
  };

  // Configuration options
  const config = {
    type: 'line',
    data: data,
    options: {
      animation: false,
      responsive: true,
      // required to resize per
      // per https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 0,
          hoverRadius: 0,
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
          },
          ticks: {
            // uncomment when cutting over to years
            // autoSkip: false, // Disable auto skipping of labels
            // maxRotation: 0, // Prevent rotation of labels
            // minRotation: 0, // Prevent rotation of labels
            color: secondaryLabelDark,
            font: {
              size: 14,
              family: "'Ubuntu', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            },
          },
        },
        y: {
          display: true,
          grid: {
            display: true, // Show gridlines
            color: separatorDark, // Color of gridlines
          },
          suggestedMin: 0,
          // suggestedMax: Math.max(...monthlyCnt) * 1.2,
          ticks: {
            color: secondaryLabelDark,
            font: {
              size: 14,
              family: "'Ubuntu', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            },
            beginAtZero: true,
            maxTicksLimit: 6,
            callback: (value) => (value >= 1000 ? `${value / 1000}k` : value),
          },
        },
      },
    },
  };
  const myChart = new Chart(
    document.getElementById('mau-chart'),
    config,
  );
});
