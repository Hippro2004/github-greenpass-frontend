type RewardCardProps = {
    id: number;
    title: string;
}

export default function RewardCard({ id, title }: RewardCardProps) {
    return (
        <div style={{ border: "1px soild gray", padding: "12px", marginBottom: "8px" }}>
            <h3>{title}</h3>
            <p>Reward id : {id}</p>
        </div>
    );
}