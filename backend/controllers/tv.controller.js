import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results.length)];
    res.json({ succes: true, content: randomTv });
  } catch (error) {
    res.status(500).json({ succes: false, message: "Internal server error" });
  }
}

export async function getTvTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ succes: true, trailer: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ succes: false, message: "Internal server error" });
  }
}

export async function getTvDetails(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ succes: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ succes: false, message: "Internal server error" });
  }
}

export async function getSimilarTvs(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ succes: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ succes: false, message: "Internal  server error" });
  }
}

export async function getTvsByCategories(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.status(200).json({ succes: true, category: data.results });
  } catch (error) {
    res.status(500).json({ succes: false, message: "Internal server error" });
  }
}
