import { yellow, blue } from '@pro_boa/ui'
import { amazonBucket } from 'constants/'

export const entries = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'My First Dataset',
      radius: 0,
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        blue[0]
      ]
    }
  ]
}
export const dataWeek = {
  labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
  datasets: [
    {
      label: '',
      radius: 0,
      data: [60, 50, 55, 20],
      backgroundColor: [
        blue[0]
      ]
    }
  ]
}

export const doughnutData = (primaryColor, secondaryColor, consumed, left) => ({
  datasets: [
    {
      data: [consumed, left],
      backgroundColor: [
        primaryColor,
        secondaryColor
      ],
      borderWidth: 0
    }
  ]
})

export const doughnutOptions = {
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      displayColors: false,
      caretSize: 0,
      padding: {
        left: 18,
        top: 15,
        right: 18,
        bottom: 15
      },
      xAlign: 'center',
      cornerRadius: 25,
      backgroundColor: '#ffffff',
      bodyColor: '#000000',
      callbacks: {
        title: _ => null,
        label: ({ formattedValue }) => formattedValue,
        afterLabel: _ => null
      }
    }
  }
}

export const radarData = {
  labels: ['.', '.', '.', '.', '.', '.', '.'],
  datasets: [
    {
      label: 'My First Dataset',
      radius: 0,
      data: [12, 19, 3, 5, 2, 3, 7],
      borderColor: [
        blue[0]
      ],
      backgroundColor: [
        `${blue[0]}5d`
      ]
    },
    {
      label: 'My secend Dataset',
      radius: 0,
      data: [2, 10, 4, 0, 10, 7, 19],
      borderColor: [
        yellow[0]
      ],
      backgroundColor: [
        `${yellow[0]}5d`
      ]
    }
  ]
}

export const radarOptions = {
  plugins: {
    legend: {
      display: false
    }
  },
  layout: {
    padding: {
      left: 25,
      right: 25,
      top: 40,
      bottom: 60
    }
  },
  scale: {
    beginAtZero: true,
    ticks: {
      maxTicksLimit: 3,
      stepSize: 1
    }
  },
  maintainAspectRatio: false
}

export const radarPlugin = (categories) => ({
  id: 'custom_labels',
  afterDraw: (chart, args) => {
    categories.forEach((category, index) => {
      const image = new window.Image()
      image.src = `${amazonBucket.categoriesUrl}${category?.Photo}`
      if (image) {
        const scale = chart.scales.r
        drawImage(scale, index, image, category?.Name)
      } else {
        image.onload = () => chart.draw()
      }
    })
  }
})

const drawImage = (scale, index, image, category) => {
  const windowScale = window.devicePixelRatio
  const offset = 40
  const r = scale.drawingArea + offset
  const angle = scale.getIndexAngle(index) - Math.PI / 2
  const x = scale.xCenter + Math.cos(angle) * r
  const y = scale.yCenter + Math.sin(angle) * r
  const ctx = scale.ctx
  ctx.save()
  ctx.translate(x, y)
  ctx.drawImage(image, -15, -30, 30, 30)
  ctx.font = `bold ${windowScale > 1 ? '9px' : '10px'} sans-serif`
  ctx.fillStyle = blue[1]
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(category, 0, 15)

  ctx.restore()
}

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems) => `${tooltipItems[0].raw} Heures`,
        label: () => ''
      },
      titleFontSize: 200,
      bodyFontSize: 200
    }
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
        drawBorder: false
      }
    },
    y: {
      grid: {
        drawBorder: false
      }
    }
  }
}
