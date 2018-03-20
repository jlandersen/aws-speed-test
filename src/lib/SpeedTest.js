import config from './config';

class SpeedTest {
    constructor() {
        this.queue = [];
    }

    async sample(url) {
        let startTime = performance.now();
        let cacheBust = Date.now();
        let result = await fetch(`${url}?${cacheBust}`);
        let endTime = performance.now();
        let latency = endTime - startTime;

        return latency;
    }

    start(regions, onSuccess) {
        for (const region of regions) {
            this.queue.push(region);
        }

        // Start 5 simultaneous test runs
        [...Array(5)].forEach(() => {
            this.runTest(this.queue.shift(), onSuccess);
        });
    }

    async runTest(region, onSuccess) {
        let result = await this.sample(region.ping);
        onSuccess({
            result,
            regionId: region.id,
        });
        this.queue.push(region);

        setTimeout(() => {
            this.runTest(this.queue.shift(), onSuccess);
        }, 500);
    }
}

export default SpeedTest;
