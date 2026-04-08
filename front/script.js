const NOTA_MAXIMA = 40;
const NOTA_APROBAR = 28;
const NOTA_MIN_SUPLETORIO = 18;

function calcular() {
    const notaSemestre = parseFloat(document.getElementById('notaSemestre').value);
    const notaSupletorio = parseFloat(document.getElementById('notaSupletorio').value);
    const resultDiv = document.getElementById('result');
    const supletorioSection = document.getElementById('supletorioSection');

    if (isNaN(notaSemestre) || notaSemestre < 0 || notaSemestre > NOTA_MAXIMA) {
        showResult('danger', 'Nota inválida', `La nota debe estar entre 0 y ${NOTA_MAXIMA}.`);
        return;
    }

    if (notaSemestre >= NOTA_APROBAR) {
        showResult('success', '¡Felicidades!', `Pasaste la materia con ${notaSemestre} puntos. No necesitas supletorio.`);
        supletorioSection.classList.remove('active');
    } else if (notaSemestre < NOTA_MIN_SUPLETORIO) {
        showResult('danger', 'Reprobado', `Sacaste ${notaSemestre} puntos. No cumples con el mínimo de ${NOTA_MIN_SUPLETORIO} para supletorio.`);
        supletorioSection.classList.remove('active');
    } else {
        const notaNecesaria = (NOTA_APROBAR * 2) - notaSemestre;
        supletorioSection.classList.add('active');

        if (!isNaN(notaSupletorio) && notaSupletorio >= 0) {
            const promedio = (notaSemestre + notaSupletorio) / 2;
            if (promedio >= NOTA_APROBAR) {
                showResult('success', '¡Aprobado!', 
                    `Con ${notaSupletorio} en supletorio, tu promedio es ${promedio.toFixed(1)}. ¡Pasaste!`);
            } else {
                showResult('danger', 'No alcanza', 
                    `Con ${notaSupletorio} en supletorio, tu promedio sería ${promedio.toFixed(1)}. Necesitas al menos ${notaNecesaria.toFixed(1)} en el supletorio.`);
            }
        } else {
            showResult('warning', 'Necesitas supletorio', 
                `Sacaste ${notaSemestre}. Necesitas al menos <span class="highlight">${notaNecesaria.toFixed(1)}</span> en el supletorio para aprobar.`);
        }
    }
}

function showResult(type, title, message) {
    const resultDiv = document.getElementById('result');
    resultDiv.className = `result active ${type}`;
    resultDiv.innerHTML = `<h2>${title}</h2><p>${message}</p>`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('notaSemestre').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calcular();
    });
});
