import { useRouter } from "next/router";
import { useCampaign } from "../../hooks/useCampaign";
import FundMemeModal from "../../components/FundMemeModal";
import Image from "next/image";

export default function VaultPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { campaign } = useCampaign(id);

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
      <Image
        src={campaign.imageUrl}
        alt="Campaign Image"
        width={600} // contoh, sesuaikan kebutuhan
        height={400} // contoh, sesuaikan kebutuhan
        style={{ objectFit: "cover" }} // opsional styling
      />
      <p className="mb-4">Goal: {campaign.goalAmount} ETH</p>
      <p className="mb-4">Raised: {campaign.raisedAmount} ETH</p>
      <p className="mb-4">Deadline: {campaign.deadline}</p>

      <FundMemeModal campaignId={campaign.id} />
    </div>
  );
}
