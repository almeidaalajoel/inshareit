import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import React, {useContext} from 'react';

import {DataContext} from '../contexts';
import {SafeAreaView} from 'react-native-safe-area-context';

const TOSScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>
          <View style={styles.padder} />
          <Text style={styles.header}>END USER LICENSE AGREEMENT</Text>
          {'\n\n'}
          <Text style={styles.date}>Last updated march 28, 2022</Text>
          {'\n\n\n'}
          Inshareit is licensed to You (End-User) by Joel Almeida (developer).
          {'\n\n'}
          By downloading the Licensed Application from Google's software
          distribution platform ("Play Store"), and any update thereto (as
          permitted by this License Agreement), You indicate that You agree to
          be bound by all terms and conditions of this License Agreement, and
          that You accept this License Agreement. Play Store is referred to in
          this License Agreement as "Services".
          {'\n\n'}
          The parties of this License Agreement acknowledge that the Services
          are not a Party to this License Agreement and are not bound by any
          provisions or obligations with regard to the Licensed Application,
          such as warranty, liability, maintenance, and support thereof. Joel
          Almeida, not the Services, is solely responsible for the Licensed
          Application and the content thereof.
          {'\n\n'}
          The License Agreement may not provide for usage rules for the Licensed
          Application that are in conflict with the latest Google Play Terms of
          Service ("Usage Rules"). Joel Almeida acknowledges that he had the
          opportunity to review the Usage Rules and this License Agreement is
          not conflicting with them.
          {'\n\n'}
          Inshareit when purchased or downloaded through the Services, is
          licensed to You for use only under the terms of this License
          Agreement. The Licensor reserves all rights not expressly granted to
          You. Inshareit is to be used on devices that oparte with Google's
          operating system ("Android").
          {'\n\n\n'}
          <Text style={styles.header}>1. THE APPLICATION</Text>
          {'\n\n'}
          Inshareit ("Licensed Application") is a piece of software created to
          provide a platform for sharing collections of things - and customized
          for Android mobile devices ("Devices"). It is used to upload,
          categorize, and share images of items.
          {'\n\n'}
          The Licensed Application is not tailored to comply with
          industry-specific regulations (Health Insurance Portability and
          Accountability Act (HIPAA), Federal Information Security Management
          Act (FISMA), etc.), so if your interactions would be subjected to such
          laws, you may not use this Licensed Application. You may not use the
          Licensed Application in a way that would violate the
          Gramm-Leach-Bliley Act (GLBA).
          {'\n\n\n'}
          <Text style={styles.header}>2. USER-GENERATED CONTRIBUTIONS</Text>
          {'\n\n'}
          The Licensed Application may invite you to chat, contribute to, or
          participate in blogs, message boards, online forums, and other
          functionality, and may provide you with the opportunity to create,
          submit, post, display, transmit, perform, publish, distribute, or
          broadcast content and materials to us or in the Licensed Application,
          including but not limited to text, writings, video, audio,
          photographs, graphics, comments, suggestions, or personal information
          or other material (collectively, "Contributions"). Contributions may
          be viewable by other users of the Licensed Application and through
          third-party websites or applications. As such, any Contributions you
          transmit may be treated as non-confidential and non-proprietary. When
          you create or make available any Contributions, you thereby represent
          and warrant that:
          {'\n\n'}
          <Text style={styles.indented}>
            1. The creation, distribution, transmission, public display, or
            performance, and the accessing, downloading, or copying of your
            Contributions do not and will not infringe the proprietary rights,
            including but not limited to copyright, patent, trademark, trade
            secret, or moral rights of any third party.
            {'\n'}
            2. You are the creator and owner of or have the necessary licenses,
            rights, consents, releases, and permissions to use and to authorize
            us, the Licensed Application, and other users of the Licensed
            Application to use your Contributions in any manner contemplated by
            the Licensed Application and this License Agreement.
            {'\n'}
            3. You have the written consent, release, and/or permission of each
            and every identifiable individual person in your Contributions to
            use the name or likeness of each and every such identifiable
            individual person to enable inclusion and use of your Contributions
            in any manner contemplated by the Licensed Application and this
            License Agreement.
            {'\n'}
            4. Your Contributions are not false, inaccurate, or misleading.
            {'\n'}
            5. Your Contributions are not unsolicited or unauthorized
            advertising, promotional materials, pyramid schemes, chain letters,
            spam, mass mailings, or other forms of solicitation.
            {'\n'}
            6. Your Contributions are not obscene, lewd, lascivious, filthy,
            violent, harassing, libelous, slanderous, or otherwise objectionable
            (as determined by us).
            {'\n'}
            7. Your Contributions do not ridicule, mock, disparage, intimidate,
            or abuse anyone.
            {'\n'}
            8. Your Contributions are not used to harass or threaten (in the
            legal sense of those terms) any other person or to promote violence
            against a specific person or class of people.
            {'\n'}
            9. Your Contributions do not violate any applicable law, regulation,
            or rule.
            {'\n'}
            10. Your Contributions do not violate the privacy or publicity
            rights of any third party.
            {'\n'}
            11. Your contributions do not violate any applicable law concerning
            child pornography, or otherwise intended to protect the health or
            well-being of minors.
            {'\n'}
            12. Your Contributions do not include any offensive comments that
            are connected to race, national origin, gender, sexual preference,
            or physical handicap.
            {'\n'}
            13. Your Contributions do not otherwise violate, or link to material
            that violates, any provision of this License Agreement, or any
            applicable law or regulation.
          </Text>
          {'\n\n'}
          Any use of the Licensed Application in volation of the foregoing
          violates this License Agreement and may result in, among other things,
          termination or suspension of your rights to use the Licensed
          Application.
          {'\n\n\n'}
          <Text style={styles.header}>3. CONTRIBUTION LICENSE</Text>
          {'\n\n'}
          By posting your Contributions to any part of the Licensed Application
          or making Contributions accessible to the Licensed Application by
          linking your account from the Licensed Application to any of your
          social networking accounts, you automatically grant, and you represent
          and warrant that you have the right to grant, to us an unrestricted,
          unlimited, irrevocable, perpetual, non-exclusive, transferable,
          royalty-free, fully-paid, worldwide right, and license to host, use
          copy, reproduce, disclose, sell, resell, publish, broadcast, retitle,
          archive, store, cache, publicly display, reformat, translate, excerpt
          (in whole or in part), and distribute such Contributions (including,
          without limitation, your image and voice) for any purpose, commercial
          advertising, or otherwise, and to prepare derivative works of, or
          incorporate in other works, such as Contributions, and grant and
          authorize sublicesnses of the foregoing. The use and distribution may
          occur in any media formats and through any media channels.
          {'\n\n'}
          This license will apply to any form, media, or technology now known or
          hereafter devloped, and includes our use of your name, company name,
          and franchise name, as applicable, and any of the trademarks, service
          marks, trade names, logos, and personal and commercial images you
          provide. You waive all moral rights in your Contributions, and you
          warrant that moral rights have not otherwise been asserted in your
          Contributions.
          {'\n\n'}
          We do not assert any ownership over your Contributions. You retain
          full ownership of all your Contributions and any intellectual property
          rights or other proprietary rights associated with your Contributions.
          We are not liable for any statements or representations in your
          Contributions provided by you in any area in the Licensed Application.
          You are solely responsible for your contributions to the licensed
          Application and you expressly agree to exonerate us from any and all
          responsibility and to refrain from any legal action against us
          regarding to your Contributions.
          {'\n\n'}
          We have the right, in our sole and absolute discretion, (1) to edit,
          redact, or otherwise change any Contributions; (2) to recategorize any
          Contributions to place them in more appropriate locations in the
          Licensed Application; and (3) to prescreen or delete any Contributions
          at any time and for any reason, without notice. We have no obligation
          to monitor your Contributions.
        </Text>
        <View style={styles.padder} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  padder: {height: 50},
  text: {color: 'black'},
  container: {paddingHorizontal: 20, flex: 1},
  header: {fontSize: 30, fontWeight: 'bold'},
  date: {fontWeight: 'bold', color: 'gray'},
  indented: {marginLeft: 50},
});

export default TOSScreen;
