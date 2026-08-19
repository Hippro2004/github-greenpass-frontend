type Reward = {
    rewardId: number;
    rewardTitle: string;
    rewardAnnouncementDate: string;
    image: string;
}

type ResponseObject<T> = {
    success: boolean;
    message: string;
    result: T;
}

export default async function RewardList() {
    const res = await fetch("http://localhost:8081/api/v1/reward/reward-all", { cache: "no-cache" })
    if (!res.ok) {
        return <p>โหลดข้อมูลไม่สำเร็จ (status : {res.status})</p>
    }

    const resJson: ResponseObject<Reward[]> = await res.json();
    const rewards = resJson.result;

    return (
        <main>
            <h1>รายการ Reward ทั้งหมด</h1>
            <ul>
                {rewards.map((reward) => <li key={reward.rewardId}>{reward.rewardTitle}</li>)}
            </ul>

        </main>
    );
}