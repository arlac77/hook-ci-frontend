

export async function refresh(app) {
  try {
    const data = await fetch("api/state");
    const state = await data.json();
    app.version = state.version;
    app.queues.length = 0;
    app.queues.push(...state.queues);
  } catch (err) {
    console.error(err);
  }
}
