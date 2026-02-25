const { spawn, spawnSync } = require("child_process");

process.env.MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/phonebook_e2e";
process.env.PORT = process.env.PORT || "3001";

const mongoImage = "local-mongo-e2e";
const mongoContainerName = "local-mongo-e2e";

spawnSync("docker", ["build", "-f", "Dockerfile.mongo", "-t", mongoImage, "."], {
  stdio: "inherit",
  shell: true,
});

spawnSync("docker", ["rm", "-f", mongoContainerName], {
  stdio: "ignore",
  shell: true,
});

spawnSync(
  "docker",
  ["run", "-d", "--name", mongoContainerName, "-p", "27017:27017", mongoImage],
  {
    stdio: "inherit",
    shell: true,
  }
);

const child = spawn("pnpm", ["dev"], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => {
  spawnSync("docker", ["stop", mongoContainerName], {
    stdio: "inherit",
    shell: true,
  });

  process.exit(code ?? 0);
});

