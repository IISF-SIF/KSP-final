# 🌆 Setting Up Bangalore Networks 🚥

Welcome to the Bangalore Networks setup guide! Here, you'll find everything you need to get started with simulating and analyzing traffic networks in the vibrant city of Bangalore. Buckle up and get ready to dive into the world of urban mobility simulations!

## 📂 BangaloreNetworks Folder

The `BangaloreNetworks` folder is the heart of this project, containing simulation and network files for two key areas in Bangalore: Sarjapur and KSR. Explore these files to get a glimpse into the intricate traffic patterns of these bustling areas.

## 📋 Prerequisites

Before we get started, you'll need to make sure you have SUMO (Simulation of Urban MObility) and its tools installed on your system. Follow these steps to get everything set up:

1. **Add SUMO's Stable Repository**

```bash
sudo add-apt-repository ppa:sumo/stable
sudo apt-get update
```

2. **Install SUMO and Its Tools**

```bash
sudo apt-get install sumo sumo-tools sumo-doc
```

3. **Set SUMO_HOME Variable**

The default installation path for SUMO is `/usr/share/sumo`. Set the `SUMO_HOME` variable by running:

```bash
echo 'export SUMO_HOME="/usr/share/sumo"' >> ~/.bashrc
source ~/.bashrc
```

4. **Improved Performance with Libsumo (Optional)**

For improved performance with Libsumo, declare the following variable:

```bash
export LIBSUMO_AS_TRACI=1
```

**Note:** Enabling this may restrict the use of `sumo-gui` and parallel simulations. For more details, check out the [Libsumo documentation](https://sumo.dlr.de/docs/Libsumo.html).

## 🚀 Installing SUMO-RL

You can install SUMO-RL, a powerful reinforcement learning library for SUMO, via pip:

**Stable Release Version:**

```bash
pip install sumo-rl
```

**Latest (Unreleased) Version from GitHub:**

```bash
git clone https://github.com/LucasAlegre/sumo-rl
cd sumo-rl
pip install -e .
```

## 🏃‍♀️ Running RESCO Codes

To run the RESCO codes, you'll need to clone the repository from GitHub:

```bash
git clone https://github.com/Pi-Star-Lab/RESCO
```

Before running, execute `python setup.py install`.

## 🤖 Running STD-MAE Codes

The STD-MAE codes depend on a separate repository hosted at https://github.com/Jimmy-7664/STD_MAE. Clone the repository and install the required packages:

```bash
git clone https://github.com/Jimmy-7664/STD_MAE
cd STD_MAE
pip install -r requirements.txt
```

You can now run the STD-MAE codes.

## 🌟 Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with descriptive commit messages
4. Push your changes to your forked repository
5. Create a pull request, and we'll review your changes as soon as possible!
