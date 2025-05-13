import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PaymentIcon from "@mui/icons-material/Payment";
import { MOCK_ENERGY_ACCOUNTS_API } from "../example-mocks/energyAccountsAPIMock";
import { MOCK_DUE_CHARGES_API } from "../example-mocks/dueChargesAPIMock";
import Payment from "./Payment";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})<ExpandMoreProps>(({ theme, expand }) => ({
  marginLeft: "auto",
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type ElectricityAccount = {
  id: string;
  type: "ELECTRICITY";
  address: string;
};

type GasAccount = {
  id: string;
  type: "GAS";
  address: string;
};

type Charge = {
  accountId: string;
  amount: number;
};

type EnergyAccount = ElectricityAccount | GasAccount;

const EnergyAccountsPage = () => {
  const [accounts, setAccounts] = useState<EnergyAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState<{
    [key: string]: Boolean;
  }>({});
  const [charges, setCharges] = useState<Charge[]>([]);

  const handleExpandClick = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    Promise.all([MOCK_ENERGY_ACCOUNTS_API(), MOCK_DUE_CHARGES_API()]).then(
      ([accountsData, chargesData]) => {
        setAccounts(accountsData);
        setCharges(chargesData);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p style={{ color: "blacK" }}>Loading accounts...</p>;

  return (
    <div>
      {accounts.map((account) => {
        const charge = charges.find((c) => c.accountId === account.id);

        return (
          <div key={account.id}>
            <Card style={{ minWidth: 600, maxWidth: 600, marginBottom: 3 }}>
              <CardHeader
                avatar={
                  <Avatar
                    style={{ backgroundColor: red[500] }}
                    aria-label="Utility"
                    src={
                      account.type === "ELECTRICITY"
                        ? "/electricity.png"
                        : "/gas.png"
                    }
                  >
                    {account.type === "ELECTRICITY" ? "E" : "G"}
                  </Avatar>
                }
                title={
                  <Typography
                    variant="h6"
                    style={{ textAlign: "left", marginLeft: 3 }}
                  >
                    {account.type}
                  </Typography>
                }
              />
              <CardContent>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: "left",
                    marginLeft: 60,
                  }}
                >
                  ID: {account.id}
                </Typography>

                <Typography
                  variant="body2"
                  style={{
                    textAlign: "left",
                    marginLeft: 60,
                  }}
                >
                  Address: {account.address}
                </Typography>

                <Typography
                  variant="body2"
                  style={{
                    textAlign: "left",
                    marginLeft: 60,
                    marginTop: 2,
                    fontWeight: "bold",
                  }}
                >
                  Account Balance:{" "}
                  <span
                    style={{
                      color:
                        charge && Number(charge.amount) < 0
                          ? "red"
                          : charge && Number(charge.amount) > 0
                          ? "green"
                          : "grey",
                    }}
                  >
                    ${charge ? Number(charge.amount).toFixed(0) : "0"}
                  </span>
                </Typography>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 60,
                    marginTop: 15,
                  }}
                >
                  <PaymentIcon
                    style={{
                      marginRight: 10,
                      color: "gray",
                    }}
                  />
                  <Typography
                    variant="body2"
                    style={{ color: "text.secondary", fontWeight: "bold" }}
                  >
                    <Payment />
                  </Typography>
                </div>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton aria-label="share">
                  <div>
                    <ShareIcon />
                    <p style={{ fontSize: 10 }}> Share your Bill</p>
                  </div>
                </IconButton>

                <ExpandMore
                  expand={!!expandedCards[account.id]}
                  onClick={() => handleExpandClick(account.id)}
                  aria-expanded={!!expandedCards[account.id]}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>

              <Collapse
                in={!!expandedCards[account.id]}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography
                    style={{
                      marginBottom: 2,
                      fontWeight: "bold",
                      textAlign: "left",
                      marginLeft: 10,
                    }}
                  >
                    Origin AI - Energy Usage Tips 💡:
                  </Typography>

                  <Typography
                    style={{
                      marginBottom: 2,
                      textAlign: "left",
                      marginLeft: 10,
                    }}
                  >
                    {account.type === "ELECTRICITY"
                      ? "To reduce your electricity usage, we recommend turning off your air-conditioning during peak times & upgrading to LED lights."
                      : "To reduce your gas usage, consider lowering your gas heater temperature or use blankets 🙂."}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default EnergyAccountsPage;
