document.getElementById("calcForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const platform = document.getElementById("platform").value;
  const niche = document.getElementById("niche").value;
  const views = parseFloat(document.getElementById("views").value);
  const likes = parseFloat(document.getElementById("likes").value);
  const comments = parseFloat(document.getElementById("comments").value);
  const shares = parseFloat(document.getElementById("shares").value);
  const saves = parseFloat(document.getElementById("saves").value);

  // Bobot Engagement
  const engagementScore = likes * 1 + comments * 3 + shares * 5 + saves * 2;
  const engagementRate = ((engagementScore / views) * 100).toFixed(2);

  // CPM Indonesia (dalam Rupiah, 2025, berdasarkan riset rata-rata)
  const cpmRates = {
    tiktok: {
      edukasi: 2500,
      lifestyle: 1800,
      beauty: 2200,
      travel: 2000,
      gaming: 1500,
      lainnya: 1700,
    },
    instagram: {
      edukasi: 3500,
      lifestyle: 3000,
      beauty: 3200,
      travel: 2800,
      gaming: 2600,
      lainnya: 2500,
    },
  };

  const cpm = cpmRates[platform][niche];
  const earning = ((views / 1000) * (cpm * (engagementRate / 100))).toFixed(0);

  document.getElementById("engRate").innerText = engagementRate;
  document.getElementById("cpmValue").innerText = cpm.toLocaleString("id-ID");
  document.getElementById("earning").innerText = "Rp " + parseInt(earning).toLocaleString("id-ID");

  document.getElementById("result").classList.remove("hidden");
});
