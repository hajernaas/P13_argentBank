import React from "react";
import iconmoney from "../../assets/icon-money.png";
import iconsecurity from "../../assets/icon-security.png";
import iconchat from "../../assets/icon-chat.png";
import FeatureItem from "./FeatureItem";

const Feature = () => {
	return (
		<section className="features">
			<h2 className="sr-only">Features</h2>
			<FeatureItem
				icon={iconchat}
				title="You are our #1 priority"
				text="Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes."
			/>
			<FeatureItem
				icon={iconmoney}
				title="More savings means higher rates"
				text="The more you save with us, the higher your interest rate will be!"
			/>
			<FeatureItem
				icon={iconsecurity}
				title="Security you can trust"
				text="We use top of the line encryption to make sure your data and money
          is always safe."
			/>
		</section>
	);
};

export default Feature;
