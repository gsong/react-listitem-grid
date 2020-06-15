/** @jsx jsx */
import VisuallyHidden from "@reach/visually-hidden";
import faker from "faker";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";

import { useClickableContent } from "./hooks";

const Card = ({
  component,
  contentType,
  title,
  subTitle,
  url,
  image,
  handleMore,
  width,
  ...props
}) => {
  const [linkRef, clickProps] = useClickableContent();

  const Item = styled(component)({
    display: "flex",
    flexDirection: "column",
    border: `1px solid hsl(0, 0%, 85%)`,
    borderRadius: 8,
    color: "hsl(0, 0%, 40%)",
    fontSize: 12,
    listStyleType: "none",
    width,

    ":hover": { boxShadow: "0 0 10px orange" },
  });

  return (
    <Item {...props}>
      <Content {...clickProps} css={{ order: 1 }}>
        <header css={{ margin: "auto 6px 6px", order: 1, paddingTop: 6 }}>
          <Title>
            <a
              ref={linkRef}
              href={url}
              css={{ color: "hsl(0, 0%, 25%)", textDecoration: "none" }}
            >
              {title}
            </a>
          </Title>
          <p css={titleStyle}>{subTitle}</p>
        </header>

        <img
          src={image.url}
          alt={image.alt ? image.alt : ""}
          css={{
            height: ((width - 2) * 9) / 16,
            objectFit: "cover",
            width: width - 2,
          }}
        />
      </Content>

      <ActionBar>
        <div aria-hidden css={{ margin: 6 }}>
          {contentType}
        </div>
        <VisuallyHidden>Content type is {contentType}</VisuallyHidden>
        <LinkButton
          onClick={handleMore}
          aria-label={`More actions for ${title}`}
        >
          •••
        </LinkButton>
      </ActionBar>
    </Item>
  );
};

const Content = styled.div({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  ":hover": { cursor: "pointer" },
});

const titleStyle = { textAlign: "center", width: "100%" };

const Title = styled.h2([
  titleStyle,
  {
    fontSize: 14,
    lineHeight: "1.35em",
    marginBottom: 6,

    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  },
]);

const ActionBar = styled.div({
  alignItems: "baseline",
  display: "flex",
  justifyContent: "space-between",
});

const LinkButton = styled.button({
  backgroundColor: "transparent",
  border: "none",
  color: "hsl(0, 0%, 40%)",
  fontWeight: 900,
  letterSpacing: ".15em",
  padding: 6,
  ":hover": { cursor: "pointer" },
  ":hover, :focus": { color: "orange", textShadow: "0 0 5px orange" },
});

export const generateCardProps = (i, width) => ({
  contentType: faker.lorem.word(),
  title: faker.lorem.words(8),
  subTitle: faker.lorem.words(),
  url: faker.internet.url(),
  image: { url: `https://picsum.photos/seed/${faker.lorem.word()}/500` },
  handleMore: () => alert(`Clicked "more" #${i}`),
});

export const spec = { minWidth: 150, maxWidth: 350 };

export default Card;
